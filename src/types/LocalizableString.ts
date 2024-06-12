import LocalizedStrings, {
  LocalizedStringsMethods,
} from 'react-native-localization';

interface ILocalizedStrings extends LocalizedStringsMethods {
  greeting: string;
  farewell: string;
  gps: string;
  login: string;
  qrCode: string;
  qrSCan: string;
  zip: string;
  login_id1: string;
  login_id2: string;
  logout: string;
  user: string;
  store: string;
  store_gift: string;
  store_gift_reg: string;
  store_store: string;
  cashzone: string;
  store_gift1: string;
  store_gift2: string;
  store_store1: string;
  store_store2: string;
  store_store3: string;
  store_store4: string;
  store_store5: string;
  store_no_store1: string;
  store_no_store2: string;
  mypage: string;
  about_careme: string;
  cash: string;
  notice: string;
  careme: string;
  app_version: string;
  faq: string;
  app_info: string;
  withdrawal: string;
  withdrawal1: string;
  withdrawal2: string;
  notice1: string;
  notice2: string;
  notice3: string;
  notice4: string;
  notice5: string;
  notice6: string;
  faq1: string;
  faq2: string;
  faq3: string;
  faq4: string;
  faq5: string;
  faq6: string;
  faq7: string;
  delete: string;
  save: string;
  store_name: string;
  store_address: string;
  address_search: string;
  store_addr_detail: string;
  store_int: string;
  store_phone: string;
  qrcode: string;
  qrcode_scan: string;
  qrcode_gen: string;
  qrcode_del: string;
  enter: string;
  qrcode_scan_gen: string;
  qrcode_scan_no: string;
  qrcode_scan_yes1: string;
  qrcode_scan_yes2: string;
  cancel: string;
  qr1: string;
  qr2: string;
  qr3: string;
  confirm: string;
  careme_pay: string;
  alert: string;
  alert1_save: string;
  alert1_delete: string;
  alert3_delete: string;
  alert3: string;
  alert2: string;
  user_gift: string;
  gift_search: string;
  gift_verify: string;
  gift_verify_success: string;
  gift_verify_fail: string;
  gift_verify_fail1: string;
  gift_verify_success1: string;
  gift_verify_success2: string;
  gift_verify_success3: string;
  gift_verify_item: string;
  gift_verify_service: string;
  store_qr_scan: string;
  user_gift_search1: string;
  user_gift_search2: string;
  user_gift_search3: string;
  store_qr1: string;
  store_qr2: string;
  gift_image: string;
  gift_id: string;
  gift_name: string;
  gift_desc: string;
  gift_regDate: string;
  gift_search_word: string;
  gift_purchase: string;
  gift_whole: string;
  gift_photo: string;
  gift_item: string;
  gift_each: string;
  gift_ea: string;
  gift_cash: string;
  gift_org_cash: string;
  gift_service: string;
  gift_count: string;
  gift_count_ea: string;
  gift_time: string;
  gift_day: string;
  gift_day_day: string;
  gift_svc: string;
  gift_sales: string;
  gift_Validity: string;
  gift_period: string;
  gift_tot_issue: string;
  gift_issue: string;
  gift_pic: string;
  gift_cam: string;
  gift_image_lib: string;
  gift_image_del: string;
  calendar: string;
  gift_enter: string;
  gift_enter1: string;
  gift_tot_issue_zero: string;
  gift_tot_issue_zero1: string;
  gift_no: string;
  save1: string;
  delete1: string;
  search: string;
  address: string;
  search_con: string;
  purchase: string;
  verify: string;
  verify1: string;
  verify2: string;
  verify3: string;
  no_data: string;
  verify_fail_reason: string;
  verify_fail_content: string;
  verify_fail_content1: string;
  verify_fail_content2: string;
  verify_fail_content3: string;
  verify_fail_content4: string;
  logout_title: string;
  logout_content: string;
  yes: string;
  no: string;
  transfer_success: string;
  transfer_fail: string;
  transfer_amount: string;
  transfer: string;
  transfer_fail_amount: string;
  transfer_fail_id: string;
}

const strings: ILocalizedStrings = new LocalizedStrings({
  en: {
    greeting: 'Hello, World!',
    farewell: 'Goodbye, World!',
    gps: 'GPS',
    qrCode: 'QR Code',
    qrSCan: 'QR Scan',
    zip: 'Search Address',
    login: 'Billchain Login',
    login_id1: 'Billchain ID needs to be issued',
    login_id2: 'through the CareMe website.',
    logout: 'Logout',
    user: 'User',
    store: 'Store',
    store_gift: 'Gift Management',
    store_gift_reg: 'Gift Registration',
    store_store: ' Store Management',
    cashzone: 'CashZone',
    store_gift1: 'Register a gift to sell',
    store_gift2: 'to attract customers to the store!',
    store_store1: 'To register the gift, register the existing',
    store_store2: 'QR code in the store for the first time, ',
    store_store3: "or if you don't have an existing QR code",
    store_store4: 'print the CareMe QR code and attach it',
    store_store5: 'to the store before registering!',
    store_no_store1: 'No stores are registered.',
    store_no_store2: 'First, register your store in Store Management!',
    mypage: 'My Page',
    about_careme: 'About careme',
    cash: 'CareMe Cash',
    notice: 'Notice',
    careme: 'CareMe',
    app_version: 'App Version 1.0.0',
    faq: 'FAQ',
    app_info: 'App Info',
    withdrawal: 'Withdrawal',
    withdrawal1: 'If you want to leave the service,',
    withdrawal2: 'you need to get a refund on your Care Me Cash.',
    notice1: ' Notice ',
    notice2: 'Service Check',
    notice3: 'Service Opening Notice',
    notice4: '2021.07.01 12:36',
    notice5: '2021.07.01 12:36',
    notice6:
      'We have established and applied this spam mail prevention policy to protect customers from the harmful effects of spam mail and to lead the right Internet culture. This is to create a clean mail communication world, so please cooperate.',
    faq1: 'User',
    faq2: 'Store Owner',
    faq3: 'Etc.',
    faq4: ' Sign Up ',
    faq5: 'Registration Information',
    faq6: 'How to sign up',
    faq7: 'We have established and applied this spam mail prevention policy to protect customers from the harmful effects of spam mail and to lead the right Internet culture. This is to create a clean mail communication world, so please cooperate.',
    delete: 'Delete',
    save: 'Save',
    store_name: 'Name',
    store_address: 'Address',
    address_search: 'Search',
    store_addr_detail: 'Address',
    store_int: 'Introduction',
    store_phone: 'Detail Addr.',
    qrcode: 'QRCode',
    qrcode_scan: 'Scan',
    qrcode_gen: 'Generate',
    qrcode_del: 'Delete',
    enter: 'Enter ',
    qrcode_scan_gen: 'Create or scan QR',
    qrcode_scan_no: 'No QR code or image.',
    qrcode_scan_yes1: 'There is already a QR code registered.',
    qrcode_scan_yes2: 'Create a QR code or scan another QR image',
    cancel: 'cancel',
    qr1: 'The QR code for the store',
    qr2: 'has been successfully registered.',
    qr3: 'Gift registration is now available!',
    confirm: 'confirm',
    careme_pay: 'CareMe Pay',
    alert: 'alert',
    alert1_save: 'It has not been saved.',
    alert1_delete: 'It has not been deleted.',
    alert3_delete: 'It has been deleted.',
    alert3: 'Register again!',
    alert2: 'Check and do it again!',
    user_gift: 'Manage My gifts',
    gift_search: 'Search gifts',
    gift_verify: 'verify gifts',
    gift_verify_success: 'Gift Verification Successful!',
    gift_verify_fail: 'Gift validation failed!!',
    gift_verify_fail1: 'Please use another Pass.',
    gift_verify_success1:
      'Show this screen to the store owner and receive or use the prize.',
    gift_verify_success2: 'to transfer',
    gift_verify_success3: 'the Care Me Cash to the store owner.',
    gift_verify_item: 'Press the Confirm Receipt button ',
    gift_verify_service: 'Press the confirmation button ',
    store_qr_scan: 'Scan store QR code',
    user_gift_search1: 'Search for the gift of the store I want and buy it.',
    user_gift_search2: 'If you visit the store,',
    user_gift_search3: 'you can receive or use the gift equivalent.',
    store_qr1: 'After filming the CareMe QR code of the store,',
    store_qr2: 'verify the gift and receive or use the product!',
    gift_image: 'Register a gift Image!',
    gift_id: 'Gift ID',
    gift_name: 'Gift name',
    gift_desc: 'Desc.',
    gift_regDate: 'Date',
    gift_search_word: 'Search word',
    gift_purchase: 'purchase method / price',
    gift_whole: 'the remainder / the whole',
    gift_photo: 'Gift Photo',
    gift_item: 'Sell goods',
    gift_each: 'Number',
    gift_ea: 'each',
    gift_cash: 'cash',
    gift_org_cash: 'cost:',
    gift_service: 'Sell services',
    gift_count: 'Count',
    gift_count_ea: 'count',
    gift_time: 'Time',
    gift_day: 'Day',
    gift_day_day: 'days',
    gift_svc: 'Service period',
    gift_sales: 'Sales period',
    gift_Validity: 'Validity',
    gift_period: 'YY-MM-DD',
    gift_tot_issue: 'Total issued quantity',
    gift_tot_issue_zero: 'Put in a number ',
    gift_tot_issue_zero1: 'greater than zero! ',
    gift_issue: 'sheet',
    gift_pic: 'Gift photo',
    gift_cam: 'Camera',
    gift_image_lib: 'Album',
    gift_image_del: 'Delete',
    calendar: 'calendar',
    gift_enter: 'Pick One,',
    gift_enter1: 'and put the price information!',
    gift_no: 'Gift No. : ',
    save1: 'Successfully saved.',
    delete1: 'Successfully deleted.',
    search: 'Search',
    address: 'Address',
    search_con: 'Enter in search conditions!',
    purchase: 'Purchase',
    verify: 'Verify',
    verify1: 'The store is not registered.',
    verify2: 'There is no gift available.',
    verify3: 'Scan again!',
    no_data: 'No data available!',
    verify_fail_reason: 'Reasons for verification failure',
    verify_fail_content: 'Pass is not valid.',
    verify_fail_content1: 'This is not the Pass requested for verification.',
    verify_fail_content2: 'It is already used Pass.',
    verify_fail_content3: 'This Pass is expired.',
    verify_fail_content4: 'Pass purchase method/price error.',
    logout_title: 'App Logout',
    logout_content: 'Are you want to exit the app?',
    yes: 'Yes',
    no: 'No',
    transfer_success: 'The transfer was successful.',
    transfer_fail: 'Transfer failed.',
    transfer_amount: 'Amount to be sent',
    transfer: 'Transfer',
    transfer_fail_amount:
      'The balance is smaller than transfer amount. Do it first charging.',
    transfer_fail_id: 'There no Billchain ID for store.',
  },
  ko: {
    greeting: '안녕하세요!',
    farewell: '안녕!',
    gps: 'GPS',
    qrCode: 'QR 생성',
    qrSCan: 'QR 스캔',
    zip: '주소 검색',
    login: '빌체인으로 로그인',
    login_id1: '케어미 웹사이트를 통해',
    login_id2: '빌체인 아이디 발급이 필요합니다.',
    logout: '로그아웃',
    user: '사용자',
    store: '가맹점',
    store_gift: '기프트 관리',
    store_gift_reg: '기프트 등록',
    store_store: '상점 관리',
    cashzone: '캐시존',
    store_gift1: '고객을 상점으로 끌어모으시려면',
    store_gift2: '판매할 기프트를 등록해주세요!',
    store_store1: '기프트를 등록하시려면 최초 1회',
    store_store2: '상점에 있는 기존 QR코드를 등록하시거나',
    store_store3: '기존 QR코드가 없으신 경우는',
    store_store4: '케어미 QR코드를 프린트해서 상점에',
    store_store5: '부착 후 등록해주세요!',
    store_no_store1: '등록된 상점이 없습니다.',
    store_no_store2: '먼저, 상점관리에서 상점을 등록하세요!',
    mypage: '마이페이지',
    about_careme: '케어미관련',
    cash: '케어미캐시',
    notice: '공지사항',
    careme: '케어미(CareMe)',
    app_version: '앱 버전 1.0.0',
    faq: '자주 묻는 질문',
    app_info: '앱 정보',
    withdrawal: '서비스 탈퇴',
    withdrawal1: '서비스를 탈퇴하시려면 보유하신',
    withdrawal2: '케어미 캐시를 환불 받으셔야 합니다.',
    notice1: '   공지   ',
    notice2: '서비스 점검',
    notice3: '서비스 오픈 안내',
    notice4: '2021.07.01 12:36',
    notice5: '2021.07.01 12:36',
    notice6:
      '스팸메일로 인한 폐해로부터 고객님을 보호하고 올바른 인터넷문화를 선도하기 위하여 본 스팸메일 방지정책을 수립하여 적용하고 있습니다. 이는 깨끗한 메일 커뮤니케이션 세상을 만들고자 함이오니 많은 협조 부탁 드립니다.',
    faq1: '사용자',
    faq2: '상점주',
    faq3: '기타',
    faq4: '   가입   ',
    faq5: '가입 안내',
    faq6: '가입 절차 방법',
    faq7: '스팸메일로 인한 폐해로부터 고객님을 보호하고 올바른 인터넷문화를 선도하기 위하여 본 스팸메일 방지정책을 수립하여 적용하고 있습니다. 이는 깨끗한 메일 커뮤니케이션 세상을 만들고자 함이오니 많은 협조 부탁 드립니다.',
    delete: '삭제',
    save: '저장',
    store_name: '상점명',
    store_address: '상점주소',
    address_search: '주소검색',
    store_addr_detail: '상세주소',
    store_int: '상점소개',
    store_phone: '상점 전화번호',
    qrcode: 'QR코드',
    qrcode_scan: 'QR이미지 스캔',
    qrcode_gen: 'QR코드 생성',
    qrcode_del: 'QR코드 삭제',
    enter: ' 입력하세요',
    qrcode_scan_gen: 'QR코드를 생성 또는 QR이미지를 스캔 하세요.',
    qrcode_scan_no: 'QR코드나 이미지가 없습니다.',
    qrcode_scan_yes1: '이미 등록된 QR코드가 있습니다.',
    qrcode_scan_yes2: 'QR코드를 생성 또는 다른 QR이미지를 스캔 하세요',
    cancel: '취소',
    qr1: '상점의 QR코드가',
    qr2: '성공적으로 등록되었습니다.',
    qr3: '이젠 기프트 등록이 가능합니다!',
    confirm: '확인',
    careme_pay: '케어미페이',
    alert: '경고',
    alert1_save: '저장되지 않았습니다.',
    alert1_delete: '삭제되지 않았습니다.',
    alert3_delete: '삭제 되었습니다.',
    alert3: '다시 등록하세요!',
    alert2: '확인 후 다시하세요!',
    user_gift: '내 기프트 관리',
    gift_search: '기프트 검색',
    gift_verify: '기프트 검증',
    gift_verify_success: '기프트 검증에 성공했습니다!',
    gift_verify_success1:
      '이 화면을 상점주에게 보여주고 상품을 받거나 이용하세요.',
    gift_verify_success2: '버튼을 누르시면',
    gift_verify_success3: '상점주에게 케어미 캐시가 이체됩니다.',
    gift_verify_item: '수령',
    gift_verify_service: '이용',
    gift_verify_fail: '기프트 검증에 실패했습니다!',
    gift_verify_fail1: '다른 Pass를 이용해 주세요.',
    store_qr_scan: '상점 QR코드 스캔',
    user_gift_search1: '내가 원하는 상점의 기프트를 검색하고 구매하세요.',
    user_gift_search2: '상점을 방문하시면 기프트에 해당하는 상품을',
    user_gift_search3: '받거나 이용할 수 있어요.',
    store_qr1: '상점의 케어미 QR코드를 촬영 후',
    store_qr2: '기프트를 검증하고 상품을 받거나 이용하세요!',
    gift_image: '기프트 이미지를 등록하세요!',
    gift_id: '기프트 아이디',
    gift_name: '기프트 명',
    gift_desc: '설명',
    gift_regDate: '등록일',
    gift_search_word: '검색어',
    // gift_sword_hint: '기프트 검색시 사용되는 ',
    gift_purchase: '구매 방식 / 가격',
    gift_whole: '잔여 / 전체',
    gift_photo: '기프트 사진',
    gift_item: '물품 판매 시',
    gift_each: '개수',
    gift_ea: '개',
    gift_cash: '캐시',
    gift_org_cash: '기존가',
    gift_service: '서비스 판매 시',
    gift_count: '횟수',
    gift_count_ea: '회',
    gift_time: '시간',
    gift_day: '일수',
    gift_day_day: '일',
    gift_svc: '서비스 기간',
    gift_sales: '판매 기간',
    gift_Validity: '유효 기간',
    gift_period: '연도-월-일',
    gift_tot_issue: '총발행수량',
    gift_tot_issue_zero: '0 보다 큰 ',
    gift_tot_issue_zero1: '총발행수량을 넣으세요! ',
    gift_issue: '장',
    gift_pic: '기프트 사진',
    gift_cam: '촬영하기',
    gift_image_lib: '앨범찾기',
    gift_image_del: '사진 지우기',
    calendar: '달력',
    gift_enter: '중 하나를 골라,',
    gift_enter1: '가격정보를 넣으세요!',
    gift_no: '기프트 번호 : ',
    save1: '성공적으로 저장 되었습니다.',
    delete1: '성공적으로 삭제 되었습니다.',
    search: '검색',
    address: '주소',
    search_con: '검색조건을 넣으세요!',
    purchase: '구매하기',
    verify: '검증하기',
    verify1: '상점이 등록되지 않았습니다.',
    verify2: '사용할 수 있는 기프트가 없습니다.',
    verify3: '다시 스캔하세요!',
    no_data: '사용 가능한 데이터가 없습니다!',
    verify_fail_reason: '검증 실패 사유',
    verify_fail_content: 'Pass가 유효하지 않습니다.',
    verify_fail_content1: '검증을 요청하신 Pass가 아닙니다.',
    verify_fail_content2: '이미 사용하신 Pass 입니다.',
    verify_fail_content3: '유효기간이 만료된 Pass 입니다.',
    verify_fail_content4: 'Pass의 구매방식/가격 오류입니다.',
    logout_title: '앱 종료',
    logout_content: '정말로 앱을 종료하시겠습니까?',
    yes: '네',
    no: '아니요',
    transfer_success: '이체가 성공 하였습니다.',
    transfer_fail: '이체가 실패 하였습니다.',
    transfer_amount: '보낼금액',
    transfer: '이체하기',
    transfer_fail_amount:
      '잔액이 이체금액 보다 작아서 이체 할 수 없습니다. 충전을 먼저 하세요.',
    transfer_fail_id: '빌체인아이디가 없는 상점 사용자입니다.',
  },
  // 다른 언어 추가 가능
});

export default strings;
