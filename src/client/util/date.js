export function getDate() {
    const now = new Date();
    var mm = now.getMonth() + 1;
    var dd = now.getDate();

  return [now.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('-');
}