import prompts from 'prompts';

const getAnswers = (currentFile: string) => {
  const choices = [
    {
      title: 'Example using a class',
      value: 'class.ts',
    },
    {
      title: 'Example using a function',
      value: 'func.ts',
    },
    {
      title: 'Example with production settings',
      value: 'prod.ts',
    },
    {
      title: 'Example using a custom logger',
      value: 'customLogger.ts',
    },
    {
      title: 'Example saving log to a local file',
      value: 'saveLog.ts',
    },
    { title: 'Exit', value: 'exit' },
  ];
  const initial = currentFile
    ? choices.findIndex(choice => choice.value === currentFile)
    : 0;

  return [
    {
      type: 'select' as const,
      name: 'file',
      initial,
      message: 'Choose what file to run',
      choices,
    },
  ];
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
        `./examples/${response.file}`
      );
      mainFunction();
    }
  }
}

main();
