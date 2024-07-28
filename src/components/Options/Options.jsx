import css from './Options.module.css';

function Options({ updateFeedback, resetFeedback, totalFeedback }) {
  return (
    <div className={css.options}>
      <button
        onClick={() => {
          updateFeedback('good');
        }}
        type="button"
      >
        Good
      </button>
      <button
        onClick={() => {
          updateFeedback('neutral');
        }}
        type="button"
      >
        Neutral
      </button>
      <button
        onClick={() => {
          updateFeedback('bad');
        }}
        type="button"
      >
        Bad
      </button>

      {Boolean(totalFeedback) && (
        <button onClick={resetFeedback} type="button">
          Reset
        </button>
      )}
    </div>
  );
}

export default Options;
