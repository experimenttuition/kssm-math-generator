const Form4Topics = {
  quadratic_roots: {
    title: "Ch 1: Quadratic Equations (Find Roots)",
    type: "mcq",
    generate: () => {
      const r1 = Math.floor(Math.random() * 5) + 1;
      const r2 = Math.floor(Math.random() * 5) + 6;
      const sum = r1 + r2;
      const prod = r1 * r2;

      return {
        latex: `Find\\ the\\ roots\\ of:\\ \\ x^2 - ${sum}x + ${prod} = 0`,
        answer: `${r1}, ${r2}`,
        options: [
          `${r1}, ${r2}`,
          `-${r1}, ${r2}`,
          `${r1}, -${r2}`,
          `-${r1}, -${r2}`
        ]
      };
    }
  },

  number_bases: {
    title: "Ch 2: Number Bases (Base 10 to Base 2)",
    type: "numeric",
    generate: () => {
      const numBase10 = Math.floor(Math.random() * 25) + 5;
      const numBase2 = parseInt(numBase10.toString(2));

      return {
        latex: `Convert\\ ${numBase10}_{10}\\ to\\ Base\\ 2.`,
        answer: numBase2
      };
    }
  }
};