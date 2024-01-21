from fastapi import Request
from starlette.responses import Response
import time
from common.Logger import logger


async def logRequests(request: Request, call_next):
    startTime = time.time()

    # 요청 처리
    logger.info(f"{request.method} {request.url.path}?{
                request.query_params} - 요청 처리 시작")
    response = await call_next(request)

    # 처리 시간 계산
    processTime = time.time() - startTime

    # 로그 기록
    logDetails = {
        "request_method": request.method,
        "request_url": request.url.path,
        "request_query": str(request.query_params),
        "response_status": response.status_code,
        "process_time": f"{processTime:.2f} seconds"
    }
    logger.info(f"{logDetails['request_method']} {logDetails['request_url']}?{
                logDetails['request_query']} - 처리상태: {logDetails['response_status']}, 처리시간: {logDetails['process_time']}")

    return response
