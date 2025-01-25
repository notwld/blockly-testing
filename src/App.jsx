import React, { useEffect, useRef } from 'react';
import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript'; // Import JavaScript generator

const toolboxCategories = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Logic',
      colour: '#5C81A6',
      contents: [
        { kind: 'block', type: 'controls_if' },
        { kind: 'block', type: 'logic_compare' },
        { kind: 'block', type: 'logic_operation' },
        { kind: 'block', type: 'logic_negate' },
        { kind: 'block', type: 'logic_boolean' },
      ],
    },
    {
      kind: 'category',
      name: 'Loops',
      colour: '#5CA65C',
      contents: [
        { kind: 'block', type: 'controls_repeat_ext' },
        { kind: 'block', type: 'controls_whileUntil' },
      ],
    },
    {
      kind: 'category',
      name: 'Math',
      colour: '#5C68A6',
      contents: [
        { kind: 'block', type: 'math_number' },
        { kind: 'block', type: 'math_arithmetic' },
        { kind: 'block', type: 'math_single' },
      ],
    },
    {
      kind: 'category',
      name: 'Text',
      colour: '#5CA68F',
      contents: [
        { kind: 'block', type: 'text' },
        { kind: 'block', type: 'text_print' },
      ],
    },
  ],
};

const BlocklyWorkspace = () => {
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);

  useEffect(() => {
    if (blocklyDiv.current) {
      try {
        // Initialize Blockly workspace
        const workspace = Blockly.inject(blocklyDiv.current, {
          toolbox: toolboxCategories,
          grid: {
            spacing: 20,
            length: 3,
            colour: '#ccc',
            snap: true,
          },
        });

        workspaceRef.current = workspace;

        console.log('Workspace initialized:', workspace);
        console.log('Blockly:', Blockly);
        console.log('javascriptGenerator:', javascriptGenerator);

        return () => {
          workspace.dispose();
          workspaceRef.current = null;
        };
      } catch (error) {
        console.error('Error initializing Blockly:', error);
      }
    }
  }, []);

  const handleRunCode = () => {
    if (!javascriptGenerator) {
      console.error('Blockly JavaScript generator is not loaded.');
      return;
    }

    if (workspaceRef.current) {
      try {
        // Generate JavaScript code from blocks
        const code = javascriptGenerator.workspaceToCode(workspaceRef.current);
        console.log('Generated Code:', code);

        // Execute the generated code
        // eslint-disable-next-line no-eval
        eval(code);
      } catch (error) {
        console.error('Error running code:', error);
      }
    } else {
      console.error('Workspace is not initialized or is null.');
    }
  };

  return (
    <div className="blockly-container" style={{ width: '100vw' }}>
      <div className="blockly-actions">
        <button
          onClick={handleRunCode}
          className="bg-blue-500 text-white p-2 rounded mb-2"
        >
          Run Code
        </button>
      </div>
      <div ref={blocklyDiv} style={{ height: '70vh', width: '100%' }} />
    </div>
  );
};

export default BlocklyWorkspace;
