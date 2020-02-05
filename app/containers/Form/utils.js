// Validate Swedish Social Security Number (personnummer) using checksum
//   Note: this is somewhat simplified because it does not take into account
//   that the date of the number is valid (e.g. "000000-0000" does return as true)
// it works for 10 digit number

const isNumeric = num => !isNaN(num);

const digitalRoot = n => ((n - 1) % 9) + 1;

const calculateCheckSum = num => {
  const mul = [2, 1, 2, 1, 2, 1, 2, 1, 2];

  const sum = [];
  for (let i = 0; i < 9; i++) {
    const n = digitalRoot(mul[i] * num[i]);
    sum.push(n);
  }
  const sumOfDigits = sum.reduce((a, b) => a + b, 0);
  const lastDigitOfSum = sumOfDigits % 10;
  const checksum = (10 - lastDigitOfSum) % 10;
  return checksum;
};

const isValidSwedishSSN = (ssn = '') => {
  const n = ssn.split('-');
  if (!(n[0].length == 6 && n[1] && n[1].length == 4)) {
    return false;
  }
  if (!isNumeric(n[0]) || !isNumeric(n[1])) {
    return false;
  }
  const numArr = n
    .join('')
    .split('')
    .map(d => parseInt(d));
  const checksum = calculateCheckSum(numArr);
  if (checksum != numArr[9]) {
    return false;
  }
  return true;
};

const isValidPhoneNum = phoneNum => {
  const re = /^[0][1-9]{1}(\d{6,8})$/;
  return re.test(phoneNum);
};

const emailIsValid = email => {
  const re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  return re.test(email);
};

export default {
  isValidSwedishSSN,
  isValidPhoneNum,
  emailIsValid,
};
