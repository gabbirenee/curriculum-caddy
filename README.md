Curriculum Caddy
============================

## Enabling Teachers through Curriculum-Centric Generative AI  

Curriculum Caddy is a Generative AI teaching assistant and tutor that is grounded in the curriculum that is being used in the classroom. For additional information on this project, check out my final paper (`Project Paper - Gabrielle Forsythe.pdf`) or my final presentation located [here](https://youtu.be/IfYNnNT4EME). 

## Running the Project
If you are here to grade or test my project, welcome! The current version of Curriculum Caddy can be found at [https://curriculum-caddy.netlify.app/](https://curriculum-caddy.netlify.app/)

### Test Script
Below is a sample test script for learning about the functionality of the tool. I included instructions for both teacher and student mode to give you a variety of options on how to use the tool. 

#### Teacher Mode
1. Open the tool by going to [https://curriculum-caddy.netlify.app/](https://curriculum-caddy.netlify.app/). This will bring you to the home page, also known as the **Ask Ada** page. On this page, the user can interact with the AI teaching assistant in chat-style format. 
2. Click on the **Start Here** button on the left hand side to get to the *Start Here* page. This will bring up the *Teacher User Guide* video that instructs teachers on how to use the tools. 
3. Click on the **Settings** button the left hand side to get to the *Settings* page. User Settings affect just an individual user while Classroom settings affect both the teacher and the students. Fill out the settings if they are not already:
    - **Name**: Add in your name! The AI responses will be personalized using the name that is put in here. 
    - **Subject**: This is passed to the model as the subject of the class is focused on. All testing and development was one with *Computer Science* as the subject so enter this in as the subject. 
    - **Grade Level**: This indicates the general age range of the class and is passed to the model to indicate what level of examples or tone would be most effective. All testing and development was one with *Middle School* as the subject so enter this in as the subject. 
    - **Preferred Programming Language**: The model can generate code snippets as part of its responses. The language that is input here will be passed to the model as the programming language that should be used when generating these snippets. Enter in *Python* to this blank. 
4. Click on the **Curriculum Button** on the left hand side to to get to the *Curriculum* page. This is where teachers can upload classroom related documents (lesson plans, curriculum documents, etc.) into the tool to provide the model with the context of what is being taught in the classroom. Let's add a new document to this repository. This can be accomplished with two methods.
    - **Manual Data Entry**: You can fill in the *Document Name*, *Document Status*, *Key Objectives*, *Key Terms*, and *Skill Level* yourself with whatever content you want to put in. You can also use the sample content below:
        - *Document Name*: Unit 3
        - *Document Status*: Not Started
        - *Key Objectives*: 
            - Apply variables, shapes, and randomNumber concepts to create a program
            - Use a structured process to plan and develop a program
            - Use conditionals to react to changes in variables and sprite properties
            - Move sprites in response to keyboard input
            - Use conditionals to react to keyboard input
            - Respond to a variety of types of user input
            - Use an if-else statement to control the flow of a program
            - Sequence commands to draw in the proper order
            - Use conditionals to react to keyboard input or changes in variables/properties
            - Communicate how to draw an image in Game Lab, accounting for shape position, color, and order
            - Reason about locations on the Game Lab coordinate grid
            - Create a prototype of an animation or game design to meet the needs of a user using the problem-solving process
            - Identify features of an animation or game design that match the needs of users
            - Understand the steps of the problem-solving process
        - *Key Terms*: 
            - programmatic images
            - animations
            - interactive art
            - primitive shapes
            - programming concepts
            - design process
            - programs
            - interactive program
            - coordinate system
            - fill
            - parameters
        - *Skill Level*:
    - **Document Upload**: Upload a document using the file upload button at the top of the page. There is a file in the `Sample Curriculum` folder of this repo called `Unit 3` that you can upload into the tool. Please note that once you upload the file, it will take 10-20 seconds to process since this file has 100+ pages and it is getting summarized by the API. Once the document is finished processing, you will see that all the fields on the page are filled out. This can be edited by the user and saved by clicking the *Save* button at the bottom of the page. 
5. Click on the **Ask Ada Button** on the left hand side to to get to the *Ask Ada* page. Here you can input anything in the text box and send the message to the AI by hitting enter or pressing the *Send* button (Paper Airplane icon). It's meant to be conversational so keep the conversation flowing! If you are looking for some ideas of what to ask, try the following questions:
    - I don’t understand this term: Digital Footprint. 
    - Can you give an example of a div?
    - Help me prepare for teaching Unit 2. 
    - How would you explain HTML to my class?

#### Student Mode
1. Open the tool by going to [https://curriculum-caddy.netlify.app/](https://curriculum-caddy.netlify.app/). This will bring you to the home page, also known as the **Ask Ada** page. On this page, the user can interact with the AI tutor in chat-style format. 
2. Click on the **Settings** button the left hand side to get to the *Settings* page. 
    - Set the *User Role* to be `Student`. This will cause the *Classroom Settings* and *Curriculum* page to disappear as the students should not have access to these tools. 
    - Change the *Name* field if needed. 
3. Click on the **Start Here** button on the left hand side to get to the *Start Here* page. This will bring up the *Student User Guide* video that students teachers on how to use the tools. 
4. Click on the **Ask Ada Button** on the left hand side to to get to the *Ask Ada* page. Here you can input anything in the text box and send the message to the AI by hitting enter or pressing the *Send* button (Paper Airplane icon). It's meant to be conversational so keep the conversation flowing! If you are looking for some ideas of what to ask, try the following questions:
    - I don’t understand this term: for loop. 
    - Can you give an example of a programming language?
    - Help me study problem solving. 
    - Quiz me on Unit 1. 

## Product Documentation
Curriculum Caddy is built using React. The data from the Settings is stored in LocalStorage while the curriculum data is stored in [Firebase](https://firebase.google.com/). The [Gemini API](https://ai.google.dev/) is the LLM used for all tutor responses and document summarization. 

### Folder Structure
```bash
Sample Curriculum/  # Curriculum files that were used for testing within the tool
src/
  brand-assets/     # Brand Color Palette and Sample Logos
  components/       # Reusable components where all functionality of the product is found
  styles/           # CSS files used for styling
User Guides/        # Written version of the video User Guides
```

### Components
```bash
App.js                          # Main container for the App
    Toolbar.js                  # Sidebar of the app that contains navigation
    MainContent.js              # Right-hand side that contains the pages of the app
        Start.js                # User Guides that provide direction on how to use the tool
        Settings.js             # User and Classroom Settings page
        Curriculum.js           # Page that allows users to upload and view curriculum
            CurriculumList.js   # Left-hand Sidebar that displays the uploaded curriculum
            DocumentDetails.js  # Right-hand side that allows user to view and input curriculum details
        ChatWindow.js           # Page that allows user to chat with the AI tutor
            BotMessage.js       # Model Response Chat Bubbles
            UserMessage.js      # User prompt chat bubbles
```
