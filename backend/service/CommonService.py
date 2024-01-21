from common.Database import DatabaseManager
from common.Logger import logger


class CommonService:
    def __init__(self, dbManager: DatabaseManager):
        self.dbManager = dbManager
        self.itemNmDict = {}
        self.itemNmDict['A'] = '전체'
        self.itemNmDict['S'] = '원단'
        self.itemNmDict['B'] = '상자'

    # 헤더 데이터 만들기
    async def makeHeaderDataProc(self, param: dict):
        # m_map_partner에서 거래 사업장 정보 가져오기
        bizInfoList = await self.dbManager.fetchAllQuery("select.mappartner", param)
        if not bizInfoList:
            return {"data": None,
                    "code": "FAIL",
                    "msg": "거래 가능한 사업장이 없습니다."
                    }
        cdDfltRegBizArea = param['CD_DFLT_REG_BIZ_AREA']
        cdDfltItem = param['CD_DFLT_ITEM']

        # 각 selectList 생성
        bizList = self.getBizSelectList(bizInfoList, cdDfltRegBizArea)
        itemList = self.getItemSelectList(
            bizInfoList, cdDfltRegBizArea, cdDfltItem)

        data = {}
        data['bizList'] = bizList
        data['itemList'] = itemList

        return {"data": data,
                "code": "SUCC",
                "msg": ""
                }

    # 사업장 리스트 생성(set을 이용하여 중복제거)
    def getBizSelectList(self, bizInfoList, cdDfltRegBizArea):
        uniqBizCdSet = set()
        result = []
        for bizInfoItem in bizInfoList:
            # CD_REG_BIZ_AREA 값이 있는지 확인하고, 있다면 set에 추가
            bizCd = bizInfoItem['CD_REG_BIZ_AREA']
            if bizCd is not None and bizCd not in uniqBizCdSet:
                uniqBizCdSet.add(bizCd)
                resultItem = {}
                resultItem['CD_REG_BIZ_AREA'] = bizCd
                resultItem['NM_REG_BIZ_AREA'] = bizInfoItem['NM_REG_BIZ_AREA']
                resultItem['CD_COMPANY'] = bizInfoItem['CD_COMPANY']
                resultItem['SELECTED'] = False
                if bizCd == cdDfltRegBizArea:
                    resultItem['SELECTED'] = True
                resultItem['type'] = 'select'
                result.append(resultItem)
        return result

    # 품목 리스트 생성(사업장 코드에 종속)
    def getItemSelectList(self, bizInfoList, cdDfltRegBizArea, cdDfltItem):
        result = []
        # 해당하는 CD_REG_BIZ_AREA의 품목 가져오기
        for bizInfoItem in bizInfoList:
            if bizInfoItem['CD_REG_BIZ_AREA'] == cdDfltRegBizArea:
                itemCd = bizInfoItem['CD_BOX_SRC_DIV']
                resultItem = {}
                resultItem['CD_BOX_SRC_DIV'] = itemCd
                resultItem['NM_BOX_SRC_DIV'] = self.itemNmDict[itemCd]
                resultItem['SELECTED'] = False
                if itemCd == cdDfltItem:
                    resultItem['SELECTED'] = True
                resultItem['type'] = 'select'
                result.append(resultItem)
        # result 품목코드가 "A"를 제외한 모든게 들어가 있다면 "A" 추가
        if len(result) == len(self.itemNmDict)-1:
            resultItem = {}
            resultItem['CD_BOX_SRC_DIV'] = 'A'
            resultItem['NM_BOX_SRC_DIV'] = self.itemNmDict['A']
            resultItem['SELECTED'] = False
            if 'A' == cdDfltItem:
                resultItem['SELECTED'] = True
            resultItem['type'] = 'select'
            result.insert(0, resultItem)
        return result
