import uvicorn
from common.Logger import logger  # Logger.py에서 로그 파일 경로 가져오기

if __name__ == "__main__":
    activeServer = 'server:app'
    activeHost = '0.0.0.0'
    activePort = 8000
    logger.info(activeServer + ' ' + activeHost +
                ':' + str(activePort) + ' 실행')
    uvicorn.run(activeServer, host=activeHost,
                port=activePort, log_level="warning")
