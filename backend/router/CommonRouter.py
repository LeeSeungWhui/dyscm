from fastapi import APIRouter, Body, Request, Response
from common.Database import dbManagers
from service.CommonService import CommonService
from common.Logger import logger

router = APIRouter()

# 헤더에 사용할 데이터


@router.get("/dyscm/common/makeHeaderDataProc.do")
async def makeHeaderDataProc(request: Request, response: Response):
    try:
        param = dict(request.query_params)
        print(request.session)
        dbManager = dbManagers.get('mariaDb')
        idMember = request.session['ID_MEMBER']
        cdDfltCompany = request.session['CD_DFLT_COMPANY']
        cdDfltRegBizArea = request.session['CD_DFLT_REG_BIZ_AREA']
        cdDfltItem = request.session['CD_DFLT_ITEM']

        if not idMember:
            return {"data": None,
                    "code": "FAIL",
                    "msg": "세션이 종료되었습니다. 다시 로그인해주세요."
                    }
        param['ID_MEMBER'] = idMember
        param['CD_DFLT_COMPANY'] = cdDfltCompany
        param['CD_DFLT_REG_BIZ_AREA'] = cdDfltRegBizArea
        param['CD_DFLT_ITEM'] = cdDfltItem

        result = await CommonService(dbManager).makeHeaderDataProc(param)

        return result
    except Exception as e:
        # 에러 처리
        logger.exception("예외 발생...")
        return {"data": None,
                "code": "ERROR",
                "msg": "헤더 생성 중 오류가 발생했습니다.\n관리자에게 문의해주세요."
                }
