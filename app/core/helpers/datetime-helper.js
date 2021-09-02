exports.dateTimeDiff = (date1, date2) => {
  var timeDiff = Math.abs(date2.getTime() - date1.getTime());

  return timeDiff;
};

// adiciona dias em uma data
exports.addDays = function(date, days) {
  var dat = new Date(date);

  dat.setDate(dat.getDate() + days);
  return dat;
};


module.exports = exports;