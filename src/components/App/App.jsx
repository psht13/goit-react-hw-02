import Description from '../Description/Description';
import Feedback from '../Feedback/Feedback';
import Notification from '../Notification/Notification';
import Options from '../Options/Options';
import { useState, useEffect } from 'react';

function App() {
  let stats = JSON.parse(localStorage.getItem('stats')) ?? {
    good: 0,
    bad: 0,
    neutral: 0,
  };

  let totalFeedback = 0;
  let positiveFeedback = 0;

  const [feedback, setFeedback] = useState({
    good: stats.good,
    neutral: stats.neutral,
    bad: stats.bad,
  });

  totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  positiveFeedback = Math.round((feedback.good / totalFeedback) * 100);

  useEffect(updateStats, [feedback]);

  function updateStats() {
    localStorage.setItem(
      'stats',
      JSON.stringify({
        good: feedback.good,
        bad: feedback.bad,
        neutral: feedback.neutral,
      })
    );
  }

  function updateFeedback(type) {
    setFeedback({
      ...feedback,
      [type]: feedback[type] + 1,
    });
  }

  function resetFeedback() {
    setFeedback({ good: 0, neutral: 0, bad: 0 });

    localStorage.removeItem('stats');
  }

  return (
    <>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        resetFeedback={resetFeedback}
        totalFeedback={totalFeedback}
      />
      {totalFeedback ? (
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
