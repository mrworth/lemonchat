import { createSlice } from '@reduxjs/toolkit';

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    topics: ["1ab5s","mpn52s"],
    messages:{
        //contains ids of posts and their replies for structure
        idTree:{
            "1ab5s": ["9bsln"],
            "9bsln": ["fbn2s"],
            "fbn2s": [],
            "mpn52s": []
        },
        byId:{
            "1ab5s":{
                user: "username",
                //description for topics, content otherwise
                content: "topic description example",
                //only used for topics and top level thread posts
                title: "example topic",
                replyTo: null,
                id: "1ab5s"
            },
            "9bsln":{
                user: "username",
                content: "example thread content",
                title: "example thread title",
                replyTo: "1ab5s",
                id: "9bsln"
            },
            "fbn2s":{
                user: "username",
                content: "example message content",
                title: null,
                replyTo: "9bsln",
                id: "fbn2s"
            },
            "mpn52s":{
                user: "username",
                //description for topics, content otherwise
                content: "topic description example 2",
                //only used for topics and top level thread posts
                title: "example topic 2",
                replyTo: null,
                id: "mpn52s"
            }
        }
    }
  },
  reducers: {
    addTopic: (state, action) => {
        return{
            ...state,
            [action.payload.topic] : {}
        }
      },
      
    addThread: (state, action) => {
        const { topic, threadId } = action.payload;
        const newTopics = { ...state.topics };
        newTopics[topic][threadId] = [];
        return {
          ...state,
          topics: newTopics
        };
    },
    addMessage: (state, action) => {
        const { topic, threadId, message} = action.payload;
        const newTopics = { ...state.topics };
        newTopics[topic][threadId].push(message);
        return {
          ...state,
          topics: newTopics
        };
    }
  },
});

export const { addTopic, addThread, addMessage } = postSlice.actions;
export const selectPosts = (state) => {
    const structuredTree = [];
  
    //recursive function to generate tree of messages
    const buildTree = (currentId) => {
        const childIdList = state.messages.idTree[currentId];
        if(childIdList.length === 0 ){
            return {
                ...state.messages.byId[currentId],
                replies: []
            };
        }else{
            const currentObject = {
                ...state.messages.byId[currentId],
                replies: []
            }
            for(const messageId of childIdList){
                const reply = buildTree(messageId);
                currentObject.replies.push({[messageId]: reply});
            }
            return currentObject;
        }
    }
    // Iterate through the topics
    for (const topicId of state.topics) {
      const topicItem = {
        ...state.messages.byId[topicId], // Add the base topic
        threads: [],
      };
  
      // Iterate across child elements (threads) of topics
      for (const threadId of state.messages.idTree[topicId]) {
        const threadMessage = {
            ...state.messages.byId[threadId],
            replies: []
        };
        const threadStructure = buildTree(threadId);
        threadMessage.replies = threadStructure.replies; // Assign replies from the structure
        topicItem.threads.push( threadMessage);
      }
      structuredTree.push(topicItem);
    }
    return structuredTree;
  };
  
export default postSlice.reducer;
