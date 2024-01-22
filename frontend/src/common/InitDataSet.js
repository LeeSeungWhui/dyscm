/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ 
    상자 주문 데이터
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
export const loginData = [
    ['ID_MEMBER', { value: "", description: "아이디를 입력해주세요.", type: "text" }],
    ['LOGIN_PWD', { value: "", description: "비밀번호를 입력해주세요.", type: "password" }],
    ['LOGIN_SAVE', { value: "false", description: "로그인 정보 기억하기", type: "checkbox" }]
];

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ 
    상자 주문 데이터
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
export const boxOrderData = [
    ['ITEM_INFO', { title: "제품정보", value: "", listVisible: true, inputVisible: false, description: "제품을 검색해주세요.", useBorder: false }],
    ['ITEM_SEARCH', { title: "제품명", value: "", listVisible: false, inputVisible: true, description: "제품명 또는 상자코드를 입력해주세요", type: "button" }],
    ['CD_ITEM', { title: "제품코드(상자코드)", value: "", listVisible: true, description: "", useBorder: false, useImage: false }],
    ['NM_ITEM', { title: "제품명", value: "", listVisible: true, inputVisible: false, description: "", useBorder: false, useImage: false }],
    ['GOL_TYPE', { title: "골유형", value: "", listVisible: true, description: "", useBorder: false, useImage: false }],
    ['GOL', { title: "골", value: "", listVisible: true, description: "", useBorder: false, useImage: false }],
    ['BOX_SIZE', { title: "상자규격(장*폭*고)", value: "", listVisible: true, description: "", useBorder: false, useImage: false }],
    ['NM_OUT_PARTNER', { title: "납품처", value: "", listVisible: true, description: "", useBorder: true, useImage: false }],
    ['QTY_SALES_ORDER', { title: "발주수량", value: "", listVisible: true, inputVisible: true, description: "발주수량을 입력해주세요.", useBorder: true, useImage: true, type: 'text' }],
    ['DELIVERY_DAY', { title: "납기일", value: "", listVisible: true, inputVisible: true, description: "상자 납기일은 기본 4일이후 입니다. 납기일을 변경하려면 담당자와 연락하세요.", useBorder: true, useImage: true, type: 'calendar' }],
    ['TXT_REMARK', { title: "비고(요청사항)", value: "", listVisible: true, inputVisible: true, description: "참고할 내용이나 요청사항을 입력해 주세요.(20자 내외, 공백포함)", useBorder: true, useImage: true, type: 'remark' }],
];