# Project Development Process
In this file, I will document the steps that I am taking through the development process and various learnings that I stumble across. 

## Environment Setup
*10/10/2024* - I opted to use the [`create-react-app`](https://github.com/facebook/create-react-app) bootstrap since it comes with everything you need to build an effective website with React. 

## Architecture/UI Draft
*10/14/2024* - Sketched out a basic plan (the lowest fidelity one can get) for what the UI will look like. Additionally, I created a basic structure for what the React component structure will look like. This file is attached as `UI and Architecture Plan.pdf`. 

## Development Notes
*10/15/2024* - Asked ChatGPT to write CSS for a ChatGPT style GUI. This generated a react file and a CSS file that I am using as starter files and building off of. These files are `Conversation.css` and `ChatWindow.js`. 

*10/19/2024* - Updated the Bot Response to be triggered off of the user input (rather than just added into the state all at once). I think that will be more helpful in the future once the API is implemented. This is done by having a function in `ChatWindow.js` that generates the Bot Message that is passed down to the `UserMessage` component as a prop and is called when the component mounts with the `useEffect` method. 

