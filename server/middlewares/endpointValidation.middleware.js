const INPUT_RULES = {
  propertyPrice: {
    validation: {
      methods: [
        {
          method: (input) => input > 0,
          errorMessage: 'input must be greater than 0',
        },
      ],
    },
  },
  downPayment: {
    validation: {
      methods: [
        {
          method: (input) => input > 0,
          errorMessage: 'input must be greater than 0',
        },
      ],
    },
  },
  interest: {
    validation: {
      methods: [
        {
          method: (input) => input > 0,
          errorMessage: 'input must be greater than 0',
        },
      ],
    },
  },
  amortPeriod: {
    validation: {
      methods: [
        {
          method: (input) => input >= 5,
          errorMessage: 'input must be greater than or equal to 5',
        },
        {
          method: (input) => input <= 30,
          errorMessage: 'input must be less than or equal to 30',
        },
        {
          method: (input) => input % 5 === 0,
          errorMessage: 'input must be an increment of 5',
        },
      ],
    },
  },
  schedule: {
    validation: {
      methods: [
        {
          method: (input) => ['accelerated-bi-weekly', 'bi-weekly', 'monthly'].includes(input),
          errorMessage: 'input must be accelerated-bi-weekly, bi-weekly or monthly',
        },
      ],
    },
  },
};

const validateInputs = (inputs, ruleset) => {
  const errors = [];
  Object.entries(inputs).map(([key, value]) => ruleset[key].validation.methods.map((methodObj) => {
    const passedTestCase = methodObj.method(value);
    if (!passedTestCase) {
      errors.push(methodObj.errorMessage.replace('input', key));
    }
    return 1;
  }));
  return errors;
};

exports.validateParams = (req, res, next) => {
  const {
    propertyPrice, downPayment, interest, amortPeriod, schedule,
  } = req.params;
  const validationMessages = validateInputs(
    {
      propertyPrice,
      downPayment,
      interest,
      amortPeriod,
      schedule,
    },
    INPUT_RULES,
  );

  if (parseInt(downPayment, 10) >= parseInt(propertyPrice, 10)) {
    validationMessages.push('down payment cannot be greater than or equal to property price');
  }
  if (validationMessages.length > 0) {
    res.status(400).json({ message: validationMessages });
  } else {
    next();
  }
};
