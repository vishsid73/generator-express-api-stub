var express = require('express');
var router = express.Router();
var config    = require('config');  // we use node-config to handle environments

var upload_path = config.get('Lexstart.uploadPath');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var multer = require('multer');
var debug = require('debug');

//CONTROLLERS
var authentication_helper = require( '../../helpers/authentication' );
var user_ctrl = require( '../../controllers/user' );
var boardmember_ctrl = require( '../../controllers/boardmember');
var shareholder_ctrl = require( '../../controllers/shareholder');
var share_class_ctrl = require( '../../controllers/share_capital_class');
var share_type_ctrl = require( '../../controllers/share_capital_type');
var authorized_share_ctrl = require( '../../controllers/authorized_share_capital');
var trademark_ctrl = require( '../../controllers/trademark');
var event_ctrl = require( '../../controllers/event');
var action_ctrl = require( '../../controllers/action');
var upload_ctrl = require('../../controllers/uploadDoc');
var email_ctrl = require('../../controllers/email');
var organization_ctrl = require('../../controllers/organization');
var request_ctrl = require('../../controllers/request');
var dev_log_ctrl = require('../../controllers/dev_log');
var package_ctrl = require('../../controllers/package');
var service_ctrl = require('../../controllers/service');
var lawyer_hours_ctrl = require('../../controllers/lawyer_hour');
var organization_subscription_ctrl = require('../../controllers/organization_subscription');
var my_account_ctrl = require('../../controllers/my_accounts');
var payment_ctrl = require('../../controllers/payment');
var op_ctrl = require('../../controllers/op_expense');
var calendar_ctrl = require('../../controllers/calendar');
var description_text_ctrl = require('../../controllers/description_text');
var requisition_item_ctrl = require('../../controllers/requisition_item');
var requisition_type_ctrl = require('../../controllers/requisition_type');
var investment_round_ctrl = require('../../controllers/investment_round');
var convertible_securities_ctrl = require('../../controllers/convertible_securities');
var org_requisition_ctrl = require('../../controllers/org_requisition');
var org_requisition_comment_ctrl = require('../../controllers/org_requisition_comment');
var org_requisition_docs_ctrl = require('../../controllers/org_requisition_doc');
var legal_event_comment_ctrl = require('../../controllers/legal_event_comment');
var special_right_ctrl = require('../../controllers/special_right');
var test_model_ctrl = require('../../controllers/test_model');
var person_helper = require('../../helpers/person');
var log_ctrl = require('../../controllers/log');
var enquiry_ctrl = require('../../controllers/enquiry');
var prospective_customer_ctrl = require('../../controllers/prospective_customer');
var esop_pool_ctrl = require('../../controllers/esop_pool');
var esop_policy_ctrl = require('../../controllers/esop_policy');
var employee_grant_ctrl = require('../../controllers/employee_grant');
var employee_ctrl = require('../../controllers/employee');
var auditor_ctrl = require('../../controllers/auditor');
var create_doc_ctrl = require('../../controllers/create_docx');
var investor_ctrl = require('../../controllers/investor');
var role_ctrl = require('../../controllers/role');
var referral_campaign_ctrl = require('../../controllers/referral_campaign');
var customer_referral_ctrl = require('../../controllers/customer_referral');
var notification_ctrl = require('../../controllers/notification');
var org_setting_ctrl = require('../../controllers/organization_setting');
var excel_export_ctrl = require('../../controllers/excel_export');
var share_links_ctrl = require('../../controllers/share_links');

var upload = multer({ dest: 'upload/' });
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var newDestination = upload_path + 'upload/' + req.body.orgid;
        var stat = null;
        try {
            stat = fs.statSync(newDestination);
        } catch (err) {
            fs.mkdirSync(newDestination);
        }
        if (stat && !stat.isDirectory()) {
            throw new Error('Directory cannot be created because an inode of a different type exists at "' + dest + '"');
        }
        cb(null, newDestination)
    },
    filename: function (req, file, cb) {
        console.log(req.body);
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err)

            cb(null, raw.toString('hex') + path.extname(file.originalname))
            //cb(null, path.basename(file.originalname))
        })
    }
});

//PATH
router.get('/',     function(req,res, next){
    res.json ('Hello!, Welcome to LexStart API V2.');
});
router.post('/login', user_ctrl.newLogin);
router.get('/sessions/verify', authentication_helper.decodeToken, user_ctrl.verifySession);
router.post('/reset', user_ctrl.generateResetHash);
router.get('/reset/:resethash', user_ctrl.getResetPasswordUserDetails);
router.put('/reset/:resethash', user_ctrl.resetPassword);
router.post('/admin/reset', user_ctrl.resetPasswordAdminAPI);
router.get('/login/generatePass', user_ctrl.generateAllUSerPassHash);


router.post('/subscribers',  user_ctrl.createSubscriber);
router.get('/subscribers',  user_ctrl.getAllcustomers);

router.post('/individualSubscribers',  user_ctrl.createIndividualSubscriber);
router.get('/individualSubscribers',  user_ctrl.getAllIndividualSubscriber);

router.post('/person/check', user_ctrl.checkEmailPerson);

router.get('/organizations/:orgid/sharedLinks', share_links_ctrl.getShareLinks);
router.get('/sharedLinks/:linkid', share_links_ctrl.getShareLinksById);
router.post('/organizations/:orgid/sharedLinks', share_links_ctrl.createShareLinks);
router.delete('/organizations/:orgid/sharedLinks/:sharelinkid', share_links_ctrl.deleteShareLinks);

router.post('/users/:personid/roles', role_ctrl.associateUserRoles);



router.get('/roles',  user_ctrl.getRoles);
router.get('/rolesByPackage',  user_ctrl.getRolesByPackage);
router.get('/users',  user_ctrl.getUsers);
router.post('/users',  user_ctrl.createUser);
router.get('/organizations',  organization_ctrl.getOrganization);
router.put('/organizations/:orgid',  organization_ctrl.updateOrganization);
router.get('/organizations/:orgid/addressBooks',  organization_ctrl.getAddressBook);

router.get('/organizations/:orgid/trademarks',  trademark_ctrl.getTrademark);
router.post('/organizations/:orgid/trademarks',  trademark_ctrl.createTrademark);
router.delete('/organizations/:orgid/trademarks/:trademarkid',  trademark_ctrl.deleteTrademark);

router.get('/organizations/:orgid/authorizedCapital',  authorized_share_ctrl.getAuthorizedCapital);
router.post('/organizations/:orgid/authorizedCapital',  authorized_share_ctrl.createAuthorizedCapital);
router.delete('/organizations/:orgid/authorizedCapital/:authorizedCapital',  authorized_share_ctrl.deleteAuthorizedCapital);

router.get('/organizations/:orgid/packages/:orgsubsid',  organization_subscription_ctrl.getOrgPackageById);
router.get('/organizations/:orgid/packages',  organization_subscription_ctrl.getOrgPackages);
router.post('/organizations/:orgid/packages',  organization_subscription_ctrl.createOrgPackage);
router.put('/organizations/:orgid/packages/:orgsubsid',  organization_subscription_ctrl.updateOrgPackage);
router.delete('/organizations/:orgid/packages/:orgsubsid',  organization_subscription_ctrl.deleteOrgPackage);

router.get('/organizations/:orgid/lawyerHours/:lawyerhourid',  lawyer_hours_ctrl.getLawyerHourById);
router.get('/organizations/:orgid/lawyerHours',  lawyer_hours_ctrl.getLawyerHours);
router.post('/organizations/:orgid/lawyerHours',  lawyer_hours_ctrl.createLawyerHour);
router.put('/organizations/:orgid/lawyerHours/:lawyerhourid',  lawyer_hours_ctrl.updateLawyerHour);
router.delete('/organizations/:orgid/lawyerHours/:lawyerhourid',  lawyer_hours_ctrl.deleteLawyerHour);

router.get('/boardmembers',  boardmember_ctrl.getAllBoardmember);
router.get('/boardmembers/:boardmember',  boardmember_ctrl.getBoardmember);
router.post('/boardmembers',  boardmember_ctrl.addBoardmember);
router.put('/boardmembers',  boardmember_ctrl.editBoardmembers);

router.get('/organizations/:orgid/shareholders',  shareholder_ctrl.getAllShareholders);

router.get('/organizations/:orgid/shareholdings',  shareholder_ctrl.getAllShareholdings);
router.get('/organizations/:orgid/shareholdings/recalculate',  shareholder_ctrl.diluteShareholdingRequest);
router.get('/organizations/:orgid/paidup/recalculate',  shareholder_ctrl.dilutePaidupPercentRequest);
router.post('/organizations/:orgid/shareholdings',  shareholder_ctrl.addShareholdingNew);
router.put('/organizations/:orgid/shareholdings',  shareholder_ctrl.editShareholding);

router.get('/organizations/:orgid/convertibleSecuritiesTotals',  convertible_securities_ctrl.getAllConvSecTotals);
router.get('/organizations/:orgid/convertibleSecurities',  convertible_securities_ctrl.getAllConvSec);
router.post('/organizations/:orgid/convertibleSecurities',  convertible_securities_ctrl.addConvSec);

router.get('/organizations/:orgid/investmentRounds/:investmentroundid',  investment_round_ctrl.getInvestmentRoundById);
router.get('/organizations/:orgid/investmentRounds',  investment_round_ctrl.getInvestmentRounds);
router.post('/organizations/:orgid/investmentRounds',  investment_round_ctrl.createInvestmentRound);
router.put('/organizations/:orgid/investmentRounds/:investmentroundid',  investment_round_ctrl.updateInvestmentRound);
router.delete('/organizations/:orgid/investmentRounds/:investmentroundid',  investment_round_ctrl.deleteInvestmentRound);

router.get('/organizations/:orgid/requisitionItems/:orgrequisitionid',  org_requisition_ctrl.getOrgRequisitionById);
router.get('/organizations/:orgid/requisitionItems',  org_requisition_ctrl.getOrgRequisitions);
router.post('/organizations/:orgid/requisitionItems',  org_requisition_ctrl.createOrgRequisition);
router.put('/organizations/:orgid/requisitionItems/:orgrequisitionid',  org_requisition_ctrl.updateOrgRequisition);

router.get('/organizations/:orgid/requisitionItems/:orgrequisitionid/comments/:orgrequisitioncommentid',  org_requisition_comment_ctrl.getOrgRequisitionCommentById);
router.get('/organizations/:orgid/requisitionItems/:orgrequisitionid/comments',  org_requisition_comment_ctrl.getOrgRequisitionComments);
router.post('/organizations/:orgid/requisitionItems/:orgrequisitionid/comments',  org_requisition_comment_ctrl.createOrgRequisitionComment);
router.delete('/organizations/:orgid/requisitionItems/:orgrequisitionid/comments/:orgrequisitioncommentid',  org_requisition_comment_ctrl.deleteOrgRequisitionComment);

router.get('/organizations/:orgid/requisitionItems/:orgrequisitionid/documents/:orgrequisitiondocid',  org_requisition_docs_ctrl.getOrgRequisitionDocById);
router.get('/organizations/:orgid/requisitionItems/:orgrequisitionid/documents',  org_requisition_docs_ctrl.getOrgRequisitionDocs);
router.post('/organizations/:orgid/requisitionItems/:orgrequisitionid/documents',  org_requisition_docs_ctrl.createOrgRequisitionDoc);
router.put('/organizations/:orgid/requisitionItems/:orgrequisitionid/documents/:orgrequisitiondocid',  org_requisition_docs_ctrl.updateOrgRequisitionDocs);
router.put('/organizations/:orgid/requisitionItems/:orgrequisitionid/documents/:orgrequisitiondocid/saveToRepo',  org_requisition_docs_ctrl.saveInRepo);
router.delete('/organizations/:orgid/requisitionItems/:orgrequisitionid/documents/:orgrequisitiondocid',  org_requisition_docs_ctrl.deleteOrgRequisitionDoc);

router.get('/organizations/:orgid/esops/pools/:poolid',  esop_pool_ctrl.getEsopPoolById);
router.get('/organizations/:orgid/esops/pools',  esop_pool_ctrl.getEsopPool);
router.post('/organizations/:orgid/esops/pools',  esop_pool_ctrl.createEsopPool);
//router.put('/organizations/:orgid/esops/pools/:policyid', esop_policy_ctrl.updateOrgPackage);
//router.delete('/organizations/:orgid/esops/pools/:policyid', esop_policy_ctrl.deleteOrgPackage);

router.get('/organizations/:orgid/esops/policies/:policyid',  esop_policy_ctrl.getEsopPolicyById);
router.get('/organizations/:orgid/esops/policies',  esop_policy_ctrl.getEsopPolicy);
router.post('/organizations/:orgid/esops/policies',  esop_policy_ctrl.createEsopPolicy);
router.put('/organizations/:orgid/esops/policies/:policyid',  esop_policy_ctrl.updateEsopPolicy);
//router.delete('/organizations/:orgid/esops/policies/:policyid', esop_policy_ctrl.deleteOrgPackage);
router.get('/organizations/:orgid/esops/policies/:policyid/generate',  create_doc_ctrl.createESOPDoc);

router.get('/organizations/:orgid/esops/:poolid/grants/:grantid',  employee_grant_ctrl.getEmployeeGrantById);
router.get('/organizations/:orgid/esops/:poolid/grants',  employee_grant_ctrl.getEmployeeGrant);
router.post('/organizations/:orgid/esops/:poolid/grants',  employee_grant_ctrl.createEmployeeGrant);
router.put('/organizations/:orgid/esops/:poolid/grants/:grantid',  employee_grant_ctrl.updateEmployeeGrant);
//router.delete('/organizations/:orgid/esops/:policyid/:policyid/grants/:grantid', employee_grant_ctrl.deleteOrgPackage);

router.get('/organizations/:orgid/persons/:personid/employees',  employee_ctrl.getEmployeeIdByPersonId);
router.get('/organizations/:orgid/employees/:employeeid',  employee_ctrl.getEmployeeById);
router.get('/organizations/:orgid/employees/:employeeid/grants',  employee_ctrl.getEmployeeByIdGrants);
router.get('/organizations/:orgid/employees',  employee_ctrl.getEmployee);
router.post('/organizations/:orgid/employees',  employee_ctrl.createEmployee);
router.put('/organizations/:orgid/employees/:employeeid',  employee_ctrl.updateEmployee);
//router.delete('/organizations/:orgid/employee_ctrl/:employee_ctrl/:policyid/grants/:grantid', employee_ctrl.deleteOrgPackage);

router.get('/organizations/:orgid/users',  user_ctrl.getOrgUser);

router.get('/organizations/:orgid/auditors/:auditorid',  auditor_ctrl.getAuditorsById);
router.get('/organizations/:orgid/auditors',  auditor_ctrl.getAuditors);
router.post('/organizations/:orgid/auditors',  auditor_ctrl.createAuditors);
router.put('/organizations/:orgid/auditors/:auditorid',  auditor_ctrl.updateAuditors);
//router.delete('/organizations/:orgid/auditors/:employee_ctrl/:policyid/grants/:grantid', auditor_ctrl.deleteOrgPackage);

router.get('/organizations/:orgid/notifications/latest',  notification_ctrl.getNotificationsLatest);
router.get('/organizations/:orgid/notifications',  notification_ctrl.getNotifications);
router.post('/organizations/:orgid/notifications',  notification_ctrl.createNotifications);
router.put('/organizations/:orgid/notifications/:notificationid',  notification_ctrl.updateNotifications);
router.put('/organizations/:orgid/persons/:personid/notifications',  notification_ctrl.updateViewedNotifications);

router.get('/organizations/:orgid/settings',  org_setting_ctrl.getOrgSettingsById);
router.post('/organizations/:orgid/settings',  org_setting_ctrl.createUpdateOrgSettings);
router.put('/organizations/:orgid/settings/:OrgSettingid',  org_setting_ctrl.updateOrgSettings);
router.delete('/organizations/:orgid/settings/:OrgSettingid',  org_setting_ctrl.deleteOrgSettings);

router.get('/shareCapitalType',  share_type_ctrl.getAllShareCapitalType);
router.post('/shareCapitalType',  share_type_ctrl.createShareCapitalType);
router.put('/shareCapitalType',  share_type_ctrl.editShareCapitalType);
router.delete('/shareCapitalType/:shareCapitalType',  share_type_ctrl.deleteShareCapitalType);

router.get('/shareCapitalClass',  share_class_ctrl.getAllShareCapitalClass);
router.post('/shareCapitalClass',  share_class_ctrl.createShareCapitalClass);
router.put('/shareCapitalClass',  share_class_ctrl.editShareCapitalClass);
router.delete('/shareCapitalClass/:shareCapitalClass',  share_class_ctrl.deleteShareCapitalClass);


router.post('/initiate/events',  event_ctrl.initiateEvent);
router.get('/events/historic',  event_ctrl.getHistoricEvents);
router.get('/events',  event_ctrl.getEvents);
router.put('/events/:legaleventid',  event_ctrl.updateEvent);
router.delete('/events/:legaleventid',  event_ctrl.deleteLegalEvent);

router.get('/events/:legaleventid/comments/:legaleventcommentid',  legal_event_comment_ctrl.getLegalEventCommentById);
router.get('/events/:legaleventid/comments',  legal_event_comment_ctrl.getLegalEventComments);
router.post('/events/:legaleventid/comments',  legal_event_comment_ctrl.createLegalEventComment);
router.delete('/events/:legaleventid/comments/:legaleventcommentid',  legal_event_comment_ctrl.deleteLegalEventComment);

router.get('/actions',  event_ctrl.getActions);
router.get('/actions/reactivate',  action_ctrl.reActivateAction);
router.post('/actions',  action_ctrl.updateAction);
router.put('/actions/documents',  action_ctrl.associateDocAction);
router.put('/actions/:actionid/emails',  action_ctrl.sendActionEmail);
router.put('/actions',  action_ctrl.moveAction);

router.get('/requests/:requestid',  request_ctrl.getRequestById);
router.get('/organizations/:orgid/requests',  request_ctrl.getRequestByOrg);
router.get('/requests',  request_ctrl.getRequests);
router.post('/requests',  request_ctrl.createRequest);
router.put('/requests/:requestid',  request_ctrl.updateRequest);
router.delete('/requests/:requestid',  request_ctrl.deleteRequest);

router.get('/referralCampaign',  referral_campaign_ctrl.getReferralCampaign);
router.put('/referralCampaign',  referral_campaign_ctrl.editReferralCampaign);
router.post('/referralCampaign',  referral_campaign_ctrl.createReferralCampaign);
router.delete('/referralCampaign/:campId',  referral_campaign_ctrl.deleteReferralCampaign);

router.get('/customerReferrals/:userId',  customer_referral_ctrl.getCustomerReferralsForUser);
router.get('/customerReferrals/org/:orgId',  customer_referral_ctrl.getCustomerReferralsForOrg);
router.get('/customerReferrals',  customer_referral_ctrl.getCustomerReferrals);
router.post('/customerReferrals',  customer_referral_ctrl.createCustomerReferral);
router.put('/customerReferrals/:referralId',  customer_referral_ctrl.updateCustomerReferral);

router.get('/enquiries',  enquiry_ctrl.getEnquiry);
router.get('/prospectiveCustomers',  prospective_customer_ctrl.getProspectiveCustomer);
router.post('/enquiries',  enquiry_ctrl.createEnquiry);
router.delete('/enquiries/:enquiryid',  enquiry_ctrl.deleteEnquiry);

router.get('/devLogs',  dev_log_ctrl.getDevLogs);
router.post('/devLogs',  dev_log_ctrl.createDevLog);
router.put('/devLogs/:devLogid',  dev_log_ctrl.updateDevLog);
router.delete('/devLogs/:devLogid',  dev_log_ctrl.deleteDevLog);

router.get('/accounts/:orgid',  my_account_ctrl.getAccountByOrg);
router.get('/accounts/:orgid/reCalculate',  my_account_ctrl.reUpdateLawyerHoursCounter);
router.post('/accounts/:orgid/persons',  my_account_ctrl.addContactPerson);
router.post('/accounts/:orgid',  my_account_ctrl.createAccount);

router.get('/packages/:packageid',  package_ctrl.getPackageById);
router.get('/packages',  package_ctrl.getPackages);
router.post('/packages',  package_ctrl.createPackage);
router.put('/packages/:packageid',  package_ctrl.updatePackage);
router.delete('/packages/:packageid',  package_ctrl.deletePackage);

router.get('/services/:serviceid',  service_ctrl.getServiceById);
router.get('/services',  service_ctrl.getServices);
router.post('/services',  service_ctrl.createService);
router.put('/services/:serviceid',  service_ctrl.updateService);
router.delete('/services/:serviceid',  service_ctrl.deleteService);

router.get('/accounts/:orgid/payments',  payment_ctrl.getPayments);
router.post('/accounts/:orgid/payments',  payment_ctrl.createPayment);
router.post('/accounts/:orgid/paymentItems',  payment_ctrl.createPaymentItems);
router.put('/accounts/:orgid/payments/:paymentid',  payment_ctrl.updatePayment);
router.delete('/accounts/:orgid/payments/:paymentid',  payment_ctrl.deletePayment);

router.get('/accounts/:orgid/opexpenses',  op_ctrl.getOPs);
router.post('/accounts/:orgid/opexpenses',  op_ctrl.createOP);
router.put('/accounts/:orgid/opexpenses/:opexpenseid',  op_ctrl.updateOP);

router.get('/calendar/:orgid/ical',  calendar_ctrl.publishiCal);
router.get('/calendar/:orgid/items',  calendar_ctrl.getCalendarItems);
router.post('/calendar/:orgid/items',  calendar_ctrl.createCalendarItem);
router.put('/calendar/:orgid/items/:calendaritemid',  calendar_ctrl.updateCalendarItem);

router.get('/descriptionTexts/:descriptiontextid',  description_text_ctrl.getDescriptionTextById);
router.get('/descriptionTexts',  description_text_ctrl.getDescriptionTexts);
router.post('/descriptionTexts',  description_text_ctrl.createDescriptionText);
router.put('/descriptionTexts/:descriptiontextid',  description_text_ctrl.updateDescriptionText);
router.delete('/descriptionTexts/:descriptiontextid',  description_text_ctrl.deleteDescriptionText);

router.get('/requisitionItems/:requisitionitemid',  requisition_item_ctrl.getRequisitionItemById);
router.get('/requisitionItems',  requisition_item_ctrl.getRequisitionItems);
router.post('/requisitionItems',  requisition_item_ctrl.createRequisitionItem);
router.put('/requisitionItems/:requisitionitemid/requisitionTypes/:requisitiontypeid',  requisition_item_ctrl.associateItemtoType);
router.put('/requisitionItems/:requisitionitemid',  requisition_item_ctrl.updateRequisitionItem);
router.delete('/requisitionItems/:requisitionitemid',  requisition_item_ctrl.deleteRequisitionItem);

router.get('/requisitionTypes/:requisitiontypeid',  requisition_type_ctrl.getRequisitionTypeById);
router.get('/requisitionTypes/:requisitiontypeid/requisitionItems',  requisition_type_ctrl.getRequisitionItemsByTypes);
router.get('/requisitionTypes',  requisition_type_ctrl.getRequisitionTypes);
router.post('/requisitionTypes',  requisition_type_ctrl.createRequisitionType);
router.put('/requisitionTypes/:requisitiontypeid',  requisition_type_ctrl.updateRequisitionType);
router.delete('/requisitionTypes/:requisitiontypeid',  requisition_type_ctrl.deleteRequisitionType);

router.get('/specialRights/:specialrightid',  special_right_ctrl.getSpecialRightsById);
router.get('/specialRights',  special_right_ctrl.getSpecialRights);
router.post('/specialRights',  special_right_ctrl.createSpecialRights);
router.put('/specialRights/:specialrightid',  special_right_ctrl.updateSpecialRights);
router.delete('/specialRights/:specialrightid',  special_right_ctrl.deleteSpecialRights);

//router.get('/specialRights/:specialrightid', special_right_ctrl.getSpecialRightsById);
router.get('/investors/:personid/organizations',  investor_ctrl.getInvestorOrganizations);

//router.put('/specialRights/:specialrightid', special_right_ctrl.updateSpecialRights);
//router.delete('/specialRights/:specialrightid', special_right_ctrl.deleteSpecialRights);


router.get('/documents/categories', upload_ctrl.getDocCategory);
router.post('/documents/categories', upload_ctrl.addDocCategory);
router.put('/documents/categories', upload_ctrl.updateCategory);
router.delete('/documents/categories', upload_ctrl.deleteDocCategory);

router.get('/documents/categories', upload_ctrl.getDocCategory);
router.get('/documents/classes', upload_ctrl.getDocClass);
router.post('/documents/classes', upload_ctrl.addDocClass);
router.put('/documents/classes', upload_ctrl.updateClass);
router.delete('/documents/classes', upload_ctrl.deleteDocClass);

router.post('/documents/attributes', upload_ctrl.addAttributes);
router.put('/documents/attributes', upload_ctrl.updateAttributes);
router.get('/documents/attributes', upload_ctrl.getAttributes);
router.get('/documents/hashtags', upload_ctrl.getHashTags);
router.delete('/documents/attributes', upload_ctrl.deleteAttributes);

router.get('/documents', upload_ctrl.getDocByOrganization);
router.post('/documents/:orgid/categories', upload_ctrl.getDocumentsForOrgByCategories);
router.get('/documents/:orgid/generate', create_doc_ctrl.generateDocument);
router.get('/downloadLink', upload_ctrl.downloadDoc);
router.post('/documents/:documentid/attributes',upload_ctrl.attachDocAttribute);
router.put('/documents/:documentid',upload_ctrl.editUploadDoc);
router.delete('/documents/:documentid',upload_ctrl.deleteDocuments)
router.post('/documents',multer({ storage: storage}).array('file'), function(req,res, next){
    //console.log(req.body); //form fields
    //console.log(req.files.file); //form files
    //res.status(204).end();
    next();
}, upload_ctrl.uploadDoc);


router.post('/email',  email_ctrl.send_user_email);
router.get('/createDoc',  create_doc_ctrl.createDoc);


router.get('/test_mail', email_ctrl.test_mail);
router.post('/test_query', organization_ctrl.testquery);
router.get('/modeltest', upload_ctrl.modeltest);
router.get('/testModels', test_model_ctrl.getTestModels);
router.post('/testModels', test_model_ctrl.createTestModel);
router.post('/testPerson', person_helper.fetchProfilePic);
router.get('/setAllProfilePic', person_helper.fetchProfilePicAll);
router.get('/moveLogintoRoles', user_ctrl.moveExistingUserRolestoRoles);
router.get('/logs', log_ctrl.getAllLog);
router.post('/logs', log_ctrl.createLog);
router.post('/createDemoUser', user_ctrl.createDemoUser);
router.get('/admin/:orgid/fillOrgSubLawyerHours', organization_subscription_ctrl.copyLawyerHoursfromPackage);
router.get('/admin/:orgid/migrateEmployeetoPerson', employee_ctrl.migrateEmployeetoPerson);
router.get('/admin/migrateVestingDatestoVest', employee_ctrl.migrateVestingDatestoVest);
router.get('/organizations/:orgid/sendDigestEmail', email_ctrl.sendDigestEmail);
router.get('/testEmit', email_ctrl.testEmitter);
router.get('/updateEventCompletionTime', event_ctrl.updateTheCompletionDate);
router.get('/checkExcelExport', excel_export_ctrl.generateExcel);

router.get('/export/excel',  excel_export_ctrl.generateExcel);


module.exports = router;