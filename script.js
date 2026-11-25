const lessons = {
  intro: {
    kicker:"MODULE 01", title:"What is a differential equation?", rememberTitle:"The big idea",
    remember:"A differential equation connects an unknown function with one or more of its derivatives.",
    steps:[
      {heading:"Start with an ordinary equation",body:`<p>You may already know equations such as <strong>x + 3 = 7</strong>. You solve for an unknown number. A differential equation is different: its unknown is a function, and the equation includes derivatives of that function.</p><div class="math-block">dy/dx = 2x</div><p>Here, y is an unknown function of x. The symbol dy/dx represents its derivative: how y changes as x changes.</p>`},
      {heading:"What do order and degree mean?",body:`<p><strong>Order</strong> is the highest order derivative present in the equation.</p><ul><li>dy/dx + y = 0 → first order</li><li>d²y/dx² + y = 0 → second order</li></ul><p><strong>Degree</strong> is the power of the highest-order derivative, after the equation has been made polynomial in derivatives.</p><div class="math-block">(dy/dx)² + y = 0<br>Order = 1, Degree = 2</div>`},
      {heading:"What are we trying to find?",body:`<p>We want to find a function y(x) that makes the differential equation true. For example:</p><div class="math-block">dy/dx = 2x<br>Integrate both sides:<br>y = x² + C</div><p>C is an arbitrary constant. Differentiating x² + C gives 2x, so it satisfies the equation.</p><p>This is called a <strong>general solution</strong>.</p>`}
    ]
  },
  separable: {
    kicker:"MODULE 02",title:"Variable separable method",rememberTitle:"Separate first, integrate second",
    remember:"Move all y terms with dy to one side, and all x terms with dx to the other side.",
    steps:[
      {heading:"Recognise a separable equation",body:`<p>An equation is separable when it can be rearranged so that the x terms and y terms are on opposite sides.</p><div class="math-block">dy/dx = x y</div><p>Divide by y and multiply by dx:</p><div class="math-block">dy/y = x dx</div><p>Now the variables are separated.</p>`},
      {heading:"Integrate both sides",body:`<p>Integrate the left side with respect to y and the right side with respect to x:</p><div class="math-block">∫(1/y) dy = ∫x dx<br>ln|y| = x²/2 + C</div><p>Remember: the integral of 1/y is ln|y|, and the integral of x is x²/2.</p>`},
      {heading:"Write the general solution",body:`<p>Exponentiate both sides to isolate y:</p><div class="math-block">|y| = e^(x²/2 + C)<br>y = A e^(x²/2)</div><p>We combine the constant into A, which can be any non-zero real constant (and y = 0 is also a solution of the original equation).</p><p><strong>General solution:</strong> y = C e^(x²/2), where C is an arbitrary constant.</p>`}
    ]
  },
  linear: {
    kicker:"MODULE 03",title:"First-order linear equations",rememberTitle:"Look for the standard form",
    remember:"A first-order linear equation can be written as dy/dx + P(x)y = Q(x).",
    steps:[
      {heading:"Understand the standard form",body:`<p>A first-order linear differential equation has this structure:</p><div class="math-block">dy/dx + P(x)y = Q(x)</div><p>P(x) and Q(x) are functions of x (or constants). The unknown function y and its first derivative appear only to the first power, and are not multiplied together.</p>`},
      {heading:"Identify P(x) and Q(x)",body:`<p>Consider this example:</p><div class="math-block">dy/dx + 2y = 6</div><p>Compare it with dy/dx + P(x)y = Q(x).</p><ul><li>P(x) = 2</li><li>Q(x) = 6</li></ul><p>It is already in standard form, so it is ready for the integrating factor method.</p>`},
      {heading:"Why does the method work?",body:`<p>We multiply the equation by a specially chosen function called the <strong>integrating factor (IF)</strong>. It makes the left side become the derivative of a product.</p><div class="math-block">IF = e^(∫P(x) dx)</div><p>The next module walks through the calculation step by step.</p>`}
    ]
  },
  factor: {
    kicker:"MODULE 04",title:"The integrating factor method",rememberTitle:"The four-step recipe",
    remember:"For dy/dx + Py = Q, use IF = e^(∫P dx), then integrate the product on the left.",
    steps:[
      {heading:"Step 1 — Put it in standard form",body:`<p>Solve this equation:</p><div class="math-block">dy/dx + 2y = 6</div><p>It is already in the form dy/dx + Py = Q. Therefore P = 2 and Q = 6.</p>`},
      {heading:"Step 2 — Calculate the integrating factor",body:`<p>Use the formula:</p><div class="math-block">IF = e^(∫P dx)<br>= e^(∫2 dx)<br>= e^(2x)</div><p>So our integrating factor is <strong>e^(2x)</strong>.</p>`},
      {heading:"Step 3 — Multiply every term by IF",body:`<p>Multiply the entire equation by e^(2x):</p><div class="math-block">e^(2x)dy/dx + 2e^(2x)y = 6e^(2x)</div><p>The left side is now the derivative of a product:</p><div class="math-block">d/dx [y e^(2x)] = 6e^(2x)</div>`},
      {heading:"Step 4 — Integrate and solve",body:`<p>Integrate both sides:</p><div class="math-block">y e^(2x) = ∫6e^(2x) dx<br>y e^(2x) = 3e^(2x) + C</div><p>Divide by e^(2x):</p><div class="math-block">y = 3 + Ce^(-2x)</div><p><strong>Final general solution:</strong> y = 3 + Ce^(-2x).</p>`}
    ]
  }
};

let currentLesson = "intro";
let currentStep = 0;
const completed = new Set(JSON.parse(localStorage.getItem("deLabCompleted") || "[]"));
const $ = (id) => document.getElementById(id);

function renderLesson() {
  const lesson = lessons[currentLesson];
  $("lesson-kicker").textContent = lesson.kicker;
  $("lesson-title").textContent = lesson.title;
  $("remember-title").textContent = lesson.rememberTitle;
  $("remember-text").textContent = lesson.remember;
  $("lesson-body").innerHTML = `<span class="step-count">STEP ${currentStep + 1}</span>${lesson.steps[currentStep].body}`;
  $("step-indicator").textContent = `Step ${currentStep + 1} of ${lesson.steps.length}`;
  $("previous-step").disabled = currentStep === 0;
  $("next-step").textContent = currentStep === lesson.steps.length - 1 ? "Lesson finished ✓" : "Next step →";
  $("complete-lesson").textContent = completed.has(currentLesson) ? "Completed ✓" : "Mark lesson complete ✓";
  document.querySelectorAll(".lesson-card").forEach(card => card.classList.toggle("active", card.dataset.lesson === currentLesson));
}
function updateProgress() {
  $("completed-count").textContent = completed.size;
  localStorage.setItem("deLabCompleted", JSON.stringify([...completed]));
}
document.querySelectorAll(".lesson-card").forEach(card => card.addEventListener("click", () => {
  currentLesson = card.dataset.lesson; currentStep = 0; renderLesson();
}));
$("previous-step").addEventListener("click", () => { if (currentStep > 0) currentStep--; renderLesson(); });
$("next-step").addEventListener("click", () => {
  if (currentStep < lessons[currentLesson].steps.length - 1) { currentStep++; renderLesson(); }
  else { completed.add(currentLesson); updateProgress(); renderLesson(); }
});
$("complete-lesson").addEventListener("click", () => { completed.add(currentLesson); updateProgress(); renderLesson(); });

const questions = [
  {q:"Which expression is a first-order differential equation?",opts:["d²y/dx² + y = 0","dy/dx + y = 0","y + 4 = 0"],a:1,why:"The highest derivative is dy/dx, which is first order."},
  {q:"Which equation is separable?",opts:["dy/dx = x y","dy/dx + 3y = x","d²y/dx² + y = 0"],a:0,why:"dy/y = x dx separates the y and x variables."},
  {q:"In dy/dx + 5y = x, what is P(x)?",opts:["x","5","5y"],a:1,why:"Compare with dy/dx + P(x)y = Q(x). P(x) is 5."},
  {q:"What is the integrating factor for dy/dx + 3y = 0?",opts:["e^(3x)","e^(x/3)","3e^x"],a:0,why:"IF = e^(∫3 dx) = e^(3x)."}
];
let questionIndex = 0, score = 0, answered = false;
function renderQuestion() {
  const q = questions[questionIndex];
  $("question-number").textContent = questionIndex + 1;
  $("quiz-progress").textContent = questions.map((_,i) => i < questionIndex ? "●" : i === questionIndex ? "◉" : "○").join(" ");
  $("question-text").textContent = q.q;
  $("answer-feedback").textContent = "";
  $("answer-feedback").className = "feedback";
  $("next-question").disabled = true;
  $("next-question").textContent = questionIndex === questions.length - 1 ? "See results →" : "Next question →";
  $("answer-options").innerHTML = "";
  answered = false;
  q.opts.forEach((option,i) => {
    const button = document.createElement("button");
    button.className = "answer-option"; button.textContent = `${String.fromCharCode(65+i)}. ${option}`;
    button.addEventListener("click", () => chooseAnswer(i));
    $("answer-options").appendChild(button);
  });
}
function chooseAnswer(index) {
  if (answered) return;
  answered = true;
  const q = questions[questionIndex];
  const buttons = [...document.querySelectorAll(".answer-option")];
  buttons.forEach((b,i) => { b.disabled = true; if (i === q.a) b.classList.add("correct"); if (i === index && i !== q.a) b.classList.add("incorrect"); });
  if (index === q.a) { score++; $("answer-feedback").textContent = `Correct! ${q.why}`; }
  else { $("answer-feedback").textContent = `Not quite. ${q.why}`; $("answer-feedback").classList.add("error"); }
  $("next-question").disabled = false;
}
$("next-question").addEventListener("click", () => {
  if (questionIndex < questions.length - 1) { questionIndex++; renderQuestion(); }
  else {
    $("question-text").textContent = `You scored ${score} out of ${questions.length}.`;
    $("answer-options").innerHTML = `<p>${score === 4 ? "Excellent work — you have a strong grasp of these basics." : "Good effort. Review the lessons and try again to improve your score."}</p>`;
    $("answer-feedback").textContent = "Your score is saved for this session.";
    $("next-question").disabled = true; $("next-question").textContent = "Quiz complete";
    $("quiz-score").textContent = `${score}/${questions.length}`;
  }
});
$("restart-quiz").addEventListener("click", () => { questionIndex = 0; score = 0; renderQuestion(); $("quiz-score").textContent = "—"; });
renderLesson(); updateProgress(); renderQuestion();
