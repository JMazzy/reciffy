// reciffy.factory('photoUploadService', ['Upload', (Upload) {
//   var sendPayload = function(formData, method, url) {
//     file_attachment = formData.file_attachment;
//     options = {
//       url: url,
//       method: method,
//       file: file_attachment
//     };
//     Upload.upload(options);
//   };

//   var createWithAttachment = function(formData) {
//     sendPayload(formData, 'POST', 'photo-upload-placeholder-url');
//   };

//   var editWithAttachment = function(formData, recordId) {
//     sendPayload(formData, 'PUT', 'http://localhost:3000/api/v1/profiles/' + recordId);
//   };
// }])