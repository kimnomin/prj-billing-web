const ResultCode = {
  SUCCESS: 200,
  AUTH_ERROR: 403,
  DELETE_ERROR: 700,
  SAVE_ERROR: 800,
  INPUT_CHECK_ERROR: 900,

  getDefaultMessage: function (code: number) {
    let message = "";
    switch (code) {
      case ResultCode.SUCCESS:
        message = "성공했습니다.";
        break;
      case ResultCode.AUTH_ERROR:
        message = "인가된 사용자가 아닙니다.";
        break;
      case ResultCode.DELETE_ERROR:
        message = "삭제 중 내부 오류가 발생했습니다.";
        break;
      case ResultCode.SAVE_ERROR:
        message = "저장시 내부 오류가 발생했습니다.";
        break;
      case ResultCode.INPUT_CHECK_ERROR:
        message = "입력값 무결성 오류 입니다.";
        break;
      default:
        break;
    }

    return message;
  },
};

export default ResultCode;