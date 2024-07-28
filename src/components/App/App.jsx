/* eslint-disable react-hooks/exhaustive-deps */
import Description from '../Description/Description';
import Feedback from '../Feedback/Feedback';
import Notification from '../Notification/Notification';
import Options from '../Options/Options';
import { useState, useEffect } from 'react';

function App() {
  let stats = JSON.parse(localStorage.getItem('stats')) ?? {
    totalFeedback: 0,
    positiveFeedback: 0,
    good: 0,
    bad: 0,
    neutral: 0,
  };

  let totalFeedback = stats.totalFeedback;
  let positiveFeedback = stats.positiveFeedback;

  const [feedback, setFeedback] = useState({
    good: stats.good,
    neutral: stats.neutral,
    bad: stats.bad,
  });

  const [isAnyFeedback, setIsAnyFeedback] = useState(false);

  totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  positiveFeedback = Math.round(
    ((feedback.good + feedback.neutral) / totalFeedback) * 100
  );

  useEffect(updateAllStats, [feedback]);

  useEffect(updateFeedbackVisibility, [totalFeedback]);

  function updateAllStats() {
    localStorage.setItem(
      'stats',
      JSON.stringify({
        totalFeedback: totalFeedback,
        positiveFeedback: positiveFeedback,
        good: feedback.good,
        bad: feedback.bad,
        neutral: feedback.neutral,
      })
    );
  }

  function updateFeedbackVisibility() {
    setIsAnyFeedback(Boolean(totalFeedback));
  }

  function updateFeedback(type) {
    setFeedback({
      ...feedback,
      [type]: feedback[type] + 1,
    });
  }

  function resetFeedback() {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
    totalFeedback = 0;
    positiveFeedback = 0;
    localStorage.clear();
  }

  return (
    <>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        resetFeedback={resetFeedback}
        updateFeedbackVisibility={updateFeedbackVisibility}
        isAnyFeedback={isAnyFeedback}
      />
      {isAnyFeedback ? (
        <Feedback
          good={feedback.good}
          neutral={feedback.neutral}
          bad={feedback.bad}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </>
  );
}

export default App;
