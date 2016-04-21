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

//   var editWithAttachment = function(formData, recordId) {
//     sendPayload(formData, 'PUT', 'http://localhost:3000/#/users/' + recordId + '/profile')
//   };
// }])