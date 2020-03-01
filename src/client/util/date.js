export function getNowDate() {
    const now = new Date();
    var mm = now.getMonth() + 1;
    var dd = now.getDate();

  return [now.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('-');
}

export function getPrevDate() {
  const prev = new Date();
  prev.setDate(prev.getDate() -1);

  var mm = prev.getMonth() + 1;
  var dd = prev.getDate();

  return [prev.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
        ].join('-');
}