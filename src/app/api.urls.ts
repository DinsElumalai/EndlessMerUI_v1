
export class ApiUrls
{
    //static baseUrl = 'http://localhost:8090/mmswebservice/api/';
    //static baseUrl = 'http://localhost:8080/api/';

    //static hostUrl = sessionStorage.getItem("mmshost") || '';
    //static hostUrl = window.location.href.substring(0, window.location.href.indexOf("mercuryMMS"))
    //static baseUrl = ApiUrls.hostUrl + 'mmswebservice/api/';
    static baseUrl = window.location.href.substring(0,window.location.href.indexOf("mercuryMMS")) + "mmswebservice/api/";  //fetching from login component

    //Admin
    static userApi = ApiUrls.baseUrl + 'user';
    static prefixApi = ApiUrls.baseUrl + 'ps';
    static prefixLastApi = ApiUrls.baseUrl + 'pslast';
    static softwareApi = ApiUrls.baseUrl + 'ss';
    static softwareConstantApi = ApiUrls.baseUrl + 'ss/con/';
    static userAccessedApi = ApiUrls.baseUrl + 'usrap';
    static userLogApi = ApiUrls.baseUrl + 'usrlog';
    static userPermissionApi = ApiUrls.baseUrl + 'usrp';
    static userGroupApi = ApiUrls.baseUrl + 'userGroup';

    //Master
    static designationApi = ApiUrls.baseUrl + 'empdg';
    static employeeApi = ApiUrls.baseUrl + 'emp';
    static employeeLastApi = ApiUrls.baseUrl + 'emplast';
    static itemApi = ApiUrls.baseUrl + 'item';
    static itemBySubTypeIdApi = ApiUrls.baseUrl + 'itembyst/';
    static itemLastApi = ApiUrls.baseUrl + 'itemlast';
    static itemTypeApi = ApiUrls.baseUrl + 'itemType';
    static itemSubTypeApi = ApiUrls.baseUrl + 'itemsubtype';
    static itemSubTypeByTypeIdApi = ApiUrls.baseUrl + 'itemstbytyid/';
    static vendorApi = ApiUrls.baseUrl + 'vendor';
    static vendorLastApi = ApiUrls.baseUrl + 'vendorlast';

    //Transaction
    static transactionApi = ApiUrls.baseUrl + 'tns';
    static transactionByReqCodeApi = ApiUrls.baseUrl + 'tns/listbyreqcode';
    static transRcrnLastApi = ApiUrls.baseUrl + 'tnslastpvr';
    static transPponLastApi = ApiUrls.baseUrl + 'tnslastbystage';
    static transRpanLastApi = ApiUrls.baseUrl + 'tnslastbystage';
    static transPdrnLastByRtApi = ApiUrls.baseUrl + 'tnslastrpvr';
    static transPdrnLastApi = ApiUrls.baseUrl + 'tnslastpdrn';
    static transLastCodeApi = ApiUrls.baseUrl + 'tnslast';
    static transLastPdrnbyRcptfromApi = ApiUrls.baseUrl + 'tnslastrcptfrompdrn';
    static pdrnApi = ApiUrls.baseUrl + 'pdrn';
    static pponApi = ApiUrls.baseUrl + 'ppon';
    static rcrnApi = ApiUrls.baseUrl + 'rcrn';
    static rpanApi = ApiUrls.baseUrl + 'rpan';

}