-- name: select.mappartner
SELECT A.CD_REG_BIZ_AREA
     , A.CD_BOX_SRC_DIV
     , B.NM_REG_BIZ_AREA
     , A.CD_COMPANY
  FROM M_MAP_PARTNER A
  JOIN VE_BIZ_AREA_V B on A.CD_REG_BIZ_AREA  = B.CD_REG_BIZ_AREA
 WHERE A.ID_MEMBER = :ID_MEMBER
   AND A.CD_APPROVAL_STATUS = '10'
 ORDER BY A.CD_REG_BIZ_AREA, CD_BOX_SRC_DIV DESC;

-- name: update.dfltbizinfo
UPDATE M_MEMBER
   SET CD_DFLT_COMPANY = :CD_DFLT_COMPANY
     , CD_DFLT_REG_BIZ_AREA = :CD_DFLT_REG_BIZ_AREA
     , CD_DFLT_ITEM = :CD_DFLT_ITEM
 WHERE ID_MEMBER = :ID_MEMBER;