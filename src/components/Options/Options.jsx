import css from './Options.module.css';

function Options({
  updateFeedback,
  resetFeedback,
  updateFeedbackVisibility,
  isAnyFeedback,
}) {
  return (
    <div className={css.options}>
      <button
        onClick={(e) => {
          updateFeedback(e.currentTarget.textContent.toLocaleLowerCase());
        }}
        type="button"
      >
        Good
      </button>
      <button
        onClick={(e) => {
          updateFeedback(e.currentTarget.textContent.toLocaleLowerCase());
        }}
        type="button"
      >
        Neutral
      </button>
      <button
        onClick={(e) => {
          updateFeedback(e.currentTarget.textContent.toLocaleLowerCase());
        }}
        type="button"
      >
        Bad
      </button>

      {isAnyFeedback && (
        <button
          onClick={() => {
            resetFeedback();
            updateFeedbackVisibility();
          }}
          type="button"
        >
          Reset
        </button>
      )}
    </div>
  );
}

export default Options;
