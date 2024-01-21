-- name: select.logincheck
SELECT A.ID_MEMBER
     , A.LOGIN_PWD
     , A.NM_MEMBER
     , A.CD_PARTNER
     , A.CD_DFLT_COMPANY
     , A.CD_DFLT_REG_BIZ_AREA
     , A.CD_DFLT_ITEM
     , A.CD_JOIN_STATUS
     , (SELECT COUNT(B.CD_REG_BIZ_AREA) FROM M_MAP_PARTNER B 
        WHERE B.ID_MEMBER = A.ID_MEMBER AND B.CD_APPROVAL_STATUS = '10')
       AS CD_APPROVAL_STATUS_CNT
  FROM M_MEMBER A
 WHERE ID_MEMBER = :ID_MEMBER;

-- name: select.searchpartner
SELECT A.CD_PARTNER
     , A.CD_COMPANY
     , A.ADDR_KOR
     , A.NM_PARTNER
     , A.NO_COMPANY
     , A.NM_CEO
     , A.NO_TEL 
     , A.NO_FAX
  FROM VE_PARTNER_V A
  JOIN VE_PRSN_MAP_PARTNER_V B ON A.CD_PARTNER = B.CD_PARTNER AND A.CD_COMPANY = B.CD_COMPANY
 WHERE A.NO_COMPANY = :NO_COMPANY
 LIMIT 1;

-- name: select.searchcompanylist
SELECT DISTINCT
       A.CD_COMPANY
     , A.CD_REG_BIZ_AREA as CD_DFLT_REG_BIZ_AREA
     , A.NM_REG_BIZ_AREA as NM_DFLT_REG_BIZ_AREA
  FROM VE_BIZ_AREA_V A
  JOIN VE_PRSN_MAP_PARTNER_V B ON A.CD_REG_BIZ_AREA = B.CD_TOP_PC
 WHERE B.CD_PARTNER = :CD_PARTNER;

-- name: select.idcheck
 SELECT ID_MEMBER
	FROM M_MEMBER
  WHERE ID_MEMBER = :ID_MEMBER;

-- name: select.partnerbizlist
SELECT A.CD_COMPANY
     , A.CD_REG_BIZ_AREA
     , CASE WHEN B.CLS_ITEM1 = '20' THEN 'S'
            ELSE 'B' END AS CLS_ITEM1
  FROM VE_BIZ_AREA_V A
  JOIN VE_PRSN_MAP_PARTNER_V B ON A.CD_REG_BIZ_AREA = B.CD_TOP_PC
 WHERE B.CD_PARTNER = :CD_PARTNER
   AND A.CD_REG_BIZ_AREA = :CD_DFLT_REG_BIZ_AREA;

-- name: insert.signup
INSERT INTO M_MEMBER (
       ID_MEMBER		 
     , CREATE_BY
		 , LAST_UPDATE_BY
     , LOGIN_PWD
     , NM_MEMBER
		 , NO_PHONE
		 , NO_COMPANY
     , EMAIL
		 , CD_PARTNER     
		 , CD_DFLT_COMPANY
		 , CD_DFLT_REG_BIZ_AREA
		 , CD_DFLT_ITEM	 
		 , CD_JOIN_STATUS
		 , YN_EMAIL_RCV
		 , YN_SMS_RCV		 
)
VALUES (
       :ID_MEMBER
     , :ID_MEMBER
     , :ID_MEMBER
     , :LOGIN_PWD
     , :NM_MEMBER
     , :NO_PHONE
     , :NO_COMPANY
     , :EMAIL
     , :CD_PARTNER
     , :CD_DFLT_COMPANY
     , :CD_DFLT_REG_BIZ_AREA
     , :CD_DFLT_ITEM
     , :CD_JOIN_STATUS
     , :YN_EMAIL_RCV
     , :YN_SMS_RCV
);

-- name: insert.mappartner
INSERT INTO M_MAP_PARTNER (
       ID_MEMBER
     , CD_BOX_SRC_DIV
     , CD_COMPANY
     , CD_REG_BIZ_AREA
     , CD_PARTNER
     , CREATE_BY
     , LAST_UPDATE_BY
     , CD_APPROVAL_STATUS     
)
VALUES (
       :ID_MEMBER
     , :CLS_ITEM1
     , :CD_COMPANY
     , :CD_REG_BIZ_AREA
     , :CD_PARTNER
     , :ID_MEMBER
     , :ID_MEMBER
     , :CD_APPROVAL_STATUS
);