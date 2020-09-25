import React, { useState } from "react";

// import { Container } from './styles';

const reset_state = {
  maxPopSize: 100,
  mutationProbability: 15,
  crossoverProbability: 50,
  generationLimiter: 20,
};

function ParamsForm({ GAparams, setGAparams }) {
  const handleSave = () => {
    setGAparams({
      maxPopSize: maxPopSize,
      mutationProbability: mutationProbability,
      crossoverProbability: crossoverProbability,
      generationLimiter: generationLimiter,
    });
  };

  const handleReset = () => {
    setMaxPopSize(reset_state.maxPopSize);
    setMutationProbability(reset_state.mutationProbability);
    setCrossoverProbability(reset_state.crossoverProbability);
    setGenerationLimiter(reset_state.generationLimiter);
    setGAparams(reset_state);
  };

  const [maxPopSize, setMaxPopSize] = useState(GAparams.maxPopSize);
  const [mutationProbability, setMutationProbability] = useState(
    GAparams.mutationProbability
  );
  const [crossoverProbability, setCrossoverProbability] = useState(
    GAparams.crossoverProbability
  );
  const [generationLimiter, setGenerationLimiter] = useState(
    GAparams.generationLimiter
  );

  return (
    <div className="ParamsForm">
      <label>Max population size</label>
      <input
        type="number"
        min="1"
        max="1000"
        value={maxPopSize}
        onChange={(data) => setMaxPopSize(parseInt(data.target.value))}
      />
      <label>Mutation Probability</label>
      <input
        type="number"
        min="0"
        max="100"
        value={mutationProbability}
        onChange={(data) => setMutationProbability(parseInt(data.target.value))}
      />
      <label>CrossOver Probability</label>
      <input
        type="number"
        min="0"
        max="100"
        value={crossoverProbability}
        onChange={(data) =>
          setCrossoverProbability(parseInt(data.target.value))
        }
      />
      <label>Generation Limiter</label>
      <input
        type="number"
        min="1"
        max="5000"
        value={generationLimiter}
        onChange={(data) => setGenerationLimiter(parseInt(data.target.value))}
      />
      <div className="formButtons">
        <button
          type="submit"
          value="Save"
          onClick={() => {
            handleSave();
          }}
        >
          Save
        </button>
        <button
          type="submit"
          value="Reset"
          onClick={() => {
            handleReset();
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default ParamsForm;
