import prompts from 'prompts';

const getAnswers = (currentFile: string) => {
  const choices = [
    {
      title: 'Example using a class',
      value: 'class',
    },
    {
      title: 'Example using a function',
      value: 'func',
    },
    {
      title: 'Example with production settings',
      value: 'prod',
    },
    {
      title: 'Example using a custom logger',
      value: 'customLogger',
    },
    {
      title: 'Example using logger as json',
      value: 'jsonLogger',
    },
    {
      title: 'Example saving log to a local file',
      value: 'saveLog',
    },
    { title: 'Exit', value: 'exit' },
  ];
  const initial = currentFile
    ? choices.findIndex(choice => choice.value === currentFile)
    : 0;

  const answers: prompts.PromptObject<string>[] = [
    {
      type: 'select',
      name: 'file',
      initial,
      message: 'Choose what file to run',
      choices,
    },
  ];

  return answers;
};

async function main() {
  let shouldContinue = true;
  let currentFile = '';

  while (shouldContinue) {
    const answers = getAnswers(currentFile);
    const response = await prompts(answers, {
      onSubmit: () => {
        console.clear();
      },
    });

    if (response.file === 'exit') {
      shouldContinue = false;
      currentFile = '';
    } else {
      currentFile = response.file;
      const { main: mainFunction } = await import(
        `./examples/${response.file}.ts`
      );
      mainFunction(response.logType);
    }
  }
}

main();
