import logging
import os
import datetime


def setup_logging():
    # 로그 파일 디렉토리 설정
    logDir = "logs"
    if not os.path.exists(logDir):
        os.makedirs(logDir)

    # 현재 날짜와 시간을 기반으로 로그 파일 이름 생성
    currentTime = datetime.datetime.now()
    logFileName = currentTime.strftime("%Y%m%d_%H%M%S") + ".log"
    logFilePath = os.path.join(logDir, logFileName)

    logger = logging.getLogger()
    logger.setLevel(logging.INFO)

    formatter = logging.Formatter(
        '%(asctime)s %(levelname)s:   %(message)s')

    fileHandler = logging.FileHandler(logFilePath)
    fileHandler.setFormatter(formatter)
    logger.addHandler(fileHandler)

    consoleHandler = logging.StreamHandler()
    consoleHandler.setFormatter(formatter)
    logger.addHandler(consoleHandler)

    return logger


logger = setup_logging()
