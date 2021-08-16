const PAYMENT_MAPPINGS = {
  monthly: 12,
  'bi-weekly': 24,
  'accelerated-bi-weekly': 26,
};

const isValidMinimumDeposit = (propertyPrice, downPayment) => {
  switch (true) {
    case propertyPrice <= 500_000: {
      return downPayment >= (propertyPrice / 100) * 5;
    }
    case propertyPrice > 500_000 && propertyPrice <= 999_999: {
      const minimumDeposit = (500000 / 100) * 5 + ((propertyPrice - 500_000) / 100) * 10;
      return downPayment >= minimumDeposit;
    }
    case propertyPrice >= 1_000_000: {
      return downPayment >= (propertyPrice / 100) * 20;
    }
    default:
      return true;
  }
};

const totalNumberOfPayments = (paymentsSchedule, amortPeriod) => paymentsSchedule * amortPeriod;

const interestPerSchedule = (rate, schedule) => rate / 100 / schedule;

const calculateMortgagePayment = (principle, interestRate, schedule, numOfPayments) => {
  const ratePerSchedule = interestPerSchedule(interestRate, schedule);
  const principleRate = principle * ratePerSchedule * (1 + ratePerSchedule) ** numOfPayments;
  const scheduleInterest = (1 + ratePerSchedule) ** numOfPayments - 1;
  const totalPayment = principleRate / scheduleInterest;
  return totalPayment;
};

const castMortgage = (principle, payment, interest, numberOfPayments, schedule) => {
  const outpuArray = [];
  let runningPrinciple = principle;
  for (let paymentNumber = 0; paymentNumber < numberOfPayments; paymentNumber += 1) {
    const interestOffset = ((runningPrinciple / 100) * interest) / schedule;
    const principleOffset = payment - interestOffset;
    const endingBalance = runningPrinciple - principleOffset;
    const paymentObject = {
      schedule: paymentNumber,
      starting_balance: runningPrinciple,
      interest: interestOffset,
      principle: principleOffset,
      ending_balance: endingBalance > 0 ? endingBalance : 0,
    };
    runningPrinciple -= principleOffset;
    outpuArray.push(paymentObject);
  }
  return outpuArray;
};

exports.getPostsRequest = (req, res) => {
  try {
    const {
      propertyPrice, downPayment, interest, amortPeriod, schedule,
    } = req.params;
    if (!isValidMinimumDeposit(propertyPrice, downPayment)) {
      res
        .status(400)
        .json({ message: `downpayment of ${downPayment} is too small` });
      return;
    }
    const principle = propertyPrice - downPayment;
    const scheduleFreq = PAYMENT_MAPPINGS[`${schedule}`];
    const totalNumOfPayments = totalNumberOfPayments(scheduleFreq, amortPeriod);
    const paymentTotal = calculateMortgagePayment(
      principle, interest, scheduleFreq, totalNumOfPayments,
    );
    const mortgageDataObject = castMortgage(
      principle, paymentTotal, interest, totalNumOfPayments, scheduleFreq,
    );
    res.status(200).json({ message: mortgageDataObject });
    return;
  } catch (error) {
    res.status(502).json({ message: error });
  }
};

exports.testApiController = (req, res) => {
  try {
    res.status(200).json({ message: 'success' });
  } catch (error) {
    res.status(502).json({ messsage: error });
  }
};
