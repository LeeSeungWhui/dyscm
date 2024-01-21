from fastapi import FastAPI
from configparser import ConfigParser
from fastapi.staticfiles import StaticFiles
from common.Database import DatabaseManager, startWatchingQueryFolder, loadQueries, dbManagers, sqlObserver
import importlib
import pkgutil
import router
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from common.Logger import logger
from common.Middleware import logRequests

app = FastAPI()

# 요청, 응답시마다 호출하는 커스텀 미들웨어
app.middleware("http")(logRequests)

# 프론트엔드와의 통신을 위한 미들웨어 설정
app.add_middleware(SessionMiddleware, secret_key="dyscm")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 오리진 허용 (실제 배포시 구체적인 오리진으로 제한 필요)
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드 허용
    allow_headers=["*"],  # 모든 헤더 허용
)
logger.info(
    'CORSMiddleware 사용, allow_origins=["*"], allow_credentials=True, allow_methods=["*"],  allow_headers=["*"]')

# DB설정파일 로드 메서드


def load_config(filename: str) -> ConfigParser:
    logger.info('설정파일 로드 중...')
    config = ConfigParser()
    config.read(filename)
    logger.info('설정파일 로드 완료')
    return config

# 시작시 실행 메소드: db설정파일에 있는 db에 연결


async def on_startup():
    logger.info('Database연결 중...')
    global sqlObserver
    for section in config.sections():
        db_url = config[section].get('url')
        if db_url:
            dbManagers[section] = DatabaseManager(db_url)
            await dbManagers[section].connect()
    logger.info('Database연결 완료')
    logger.info('쿼리 로드 중...')
    loadQueries()
    logger.info('쿼리 로드 완료')
    sqlObserver = startWatchingQueryFolder()
    logger.info('쿼리 감시 시작')

# 종료시 실행 메소드


async def on_shutdown():
    for manager in dbManagers.values():
        await manager.disconnect()
    if sqlObserver:
        sqlObserver.stop()
        sqlObserver.join()

# config.ini 읽어오기
config = load_config("config.ini")

# 시작 및 종료시 이벤트 핸들링
app.add_event_handler("startup", on_startup)
app.add_event_handler("shutdown", on_shutdown)

logger.info('라우터 로드 중...')
for (_, module_name, _) in pkgutil.iter_modules(router.__path__, router.__name__ + "."):
    module = importlib.import_module(module_name)
    if hasattr(module, 'router'):
        app.include_router(module.router)
logger.info('라우터 로드 완료')
logger.info('정적 소스 로드 중...')
app.mount("/", StaticFiles(directory="../frontend/build", html=True), name="static")
logger.info('정적 소스 로드 완료')
