
export class NoteSlip
{

    noteSlipId : number = 0;
    requisitionCategoryOurCode : string;
    transactionCategory : string;
    requisitionCategory : string;
    noteSlipDate : string;
    noteSlipShift : string;
    inchargeEmployeeId : string;
    operatorEmployeeId : string ;
    machineItemId : string ;
    productionCategory : string;
    partItemId : string;
    partStage : string;
    partStageNumber : string;
    receiptFromVendorId : string;
    receiptDate : Date;
    fromShopfloor : Boolean;
    rpSfp  : boolean;
    toStock : boolean;
    rawMaterialItemId  : string;
    batchNo : string;
    issueCategory : string;
    issueToVendorId : string;
    requisitionGroupCategory : string;
    requisitionGroupNo : string;
    returnPartItemId : string;
    returnPartStage : string;
    returnPartStageNo : number =0;
    wtMcAverage1Gms : number=0;
    wtMcAverage2Gms : number=0;
    unitWtGms : number=0;
    stockNos : number=0;
    stockWt : number=0.0000;
    openingNos : number=0;
    openingWt : number=0.0000;
    okayNos : number=0;
    okayWt : number=0.0000;
    rejectedNos : number=0;
    rejectedWt : number=0.0000;
    takenNos : number=0;
    takenWt : number=0.0000;
    directTakenNos : number=0;
    directTakenWt : number=0.0000;
    pendingTakenNos : number=0;
    pendingTakenWt : number=0.0000;
    adjustNos : number=0;
    adjustWt : number=0.0000;
    mismatchNos : number=0;
    mismatchWt : number=0.0000;
    rejectedReason : string;
    binLocation : string;
    remarks : string;
    verified : Boolean;
    rcrnRefNoteSlipId : string; 
    pponRefNoteSlipId : string;
    rpanRefNoteSlipId : string;
    pdrnRefNoteSlipId : string;
    createdClient : string;
    createdDate : Date;
    updatedDate : Date;
    createdUserId : string;
    updatedUserId : string;

}


