import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  //this validates email format crazyy
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

export const addThousandSeparator = (num) => {
  return num.toLocaleString('en-IN');  // or 'en-US' if you want
}

export const prepareExpenseBarChartdata = (data = []) => {
  const chartData = data.map((item) => ({
    category: item?.category,
    amount: item?.amount
  }))

  return chartData
}

export const prepareIncomeBarChartData = (data = []) => {
  const currentYear = moment().format("YYYY");

  const filteredData = data.filter(
    (item) => moment(item.date).format("YYYY") === currentYear
  );

  const sorted = [...filteredData].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const chartData = sorted.map((item) => ({
    month: moment(item.date).format("Do MMM"), // e.g. "12th Jan"
    amount: item.amount,
    source: item.source,
  }));

  return chartData;

};

// utils/colorGenerator.js
export const generateColors = (count) => {
  const colors = []
  for (let i = 0; i < count; i++) {
    const hue = (i * 137.508) % 360
    colors.push(`hsl(${hue}, 65%, 60%)`)
  }
  return colors
}

export const prepareExpenseLineChartdata = (data = []) => {
  const currentYear = moment().format("YYYY");

  const filteredData = data.filter(
    (item) => moment(item.date).format("YYYY") === currentYear
  );

  // group by month
  const grouped = {};

  filteredData.forEach((item) => {
    const month = moment(item.date).format("Do MMM");
    if (!grouped[month]) {
      grouped[month] = 0;
    }
    grouped[month] += item.amount;
  });

  // convert back to array
  const chartData = Object.entries(grouped).map(([month, amount]) => ({
    month,
    amount,
  }));

  return chartData;
};
