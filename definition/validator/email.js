"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = emailValidation;
var EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Email validator using a Regex.
 * @param  {string} emailToValidate - The email to validate.
 * @return {boolean} - True if the email is valide , false otherwise.
 */
function emailValidation(emailToValidate) {
  return EMAIL_REGEX.test(emailToValidate);
}
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6WyJlbWFpbFZhbGlkYXRpb24iLCJFTUFJTF9SRUdFWCIsImVtYWlsVG9WYWxpZGF0ZSIsInRlc3QiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQU93QkEsZTtBQVB4QixJQUFNQyxjQUFjLDJKQUFwQjs7QUFFQTs7Ozs7QUFLZSxTQUFTRCxlQUFULENBQXlCRSxlQUF6QixFQUEwQztBQUNyRCxTQUFPRCxZQUFZRSxJQUFaLENBQWlCRCxlQUFqQixDQUFQO0FBQ0giLCJmaWxlIjoicHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRU1BSUxfUkVHRVggPSAvXigoW148PigpW1xcXVxcXFwuLDs6XFxzQFxcXCJdKyhcXC5bXjw+KClbXFxdXFxcXC4sOzpcXHNAXFxcIl0rKSopfChcXFwiLitcXFwiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFxdKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLztcclxuXHJcbi8qKlxyXG4gKiBFbWFpbCB2YWxpZGF0b3IgdXNpbmcgYSBSZWdleC5cclxuICogQHBhcmFtICB7c3RyaW5nfSBlbWFpbFRvVmFsaWRhdGUgLSBUaGUgZW1haWwgdG8gdmFsaWRhdGUuXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59IC0gVHJ1ZSBpZiB0aGUgZW1haWwgaXMgdmFsaWRlICwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZW1haWxWYWxpZGF0aW9uKGVtYWlsVG9WYWxpZGF0ZSkge1xyXG4gICAgcmV0dXJuIEVNQUlMX1JFR0VYLnRlc3QoZW1haWxUb1ZhbGlkYXRlKTtcclxufVxyXG4iXX0=