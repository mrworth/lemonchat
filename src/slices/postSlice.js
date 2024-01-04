import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid'; 

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    topics: ["1ab5s","mpn52s"],
    messages:{
        //contains ids of posts and their replies for structure
        idTree:{
            "1ab5s": ["9bsln","lf9pds"],
            "9bsln": ["fbn2s"],
            "fbn2s": ["fbn3s"],
            "mpn52s": [],
            "lf9pds": [],
            "fbn3s": []
        },
        byId:{
            "1ab5s":{
                user: "username",
                content: "topic description example",
                //only used for topics and top level thread posts
                title: "example topic"
            },
            "9bsln":{
                user: "username",
                content: "example thread content",
                title: "example thread title"
            },
            "fbn2s":{
              user: "username",
              content: "example reply message content",
              title: null
            },
            "fbn3s":{
              user: "username",
              content: "example secondary reply content",
              title: null
            },
            "mpn52s":{
                user: "username",
                //description for topics, content otherwise
                content: "topic description example 2",
                //only used for topics and top level thread posts
                title: "example topic 2"
            },
            "lf9pds":{
                user: "username",
                //description for topics, content otherwise
                content: "thread description example 2",
                //only used for topics and top level thread posts
                title: "example thread 2"
            }
        }
    }
  },
  reducers: {
      addTopic: (state, action) => {
        const { title, content } = action.payload;
        const threadId = uuidv4();

        state.topics.push(threadId)
        state.messages.idTree[threadId] = [];
        
        state.messages.byId[threadId] = {
            user: 'default',
            title: title,
            content: content
        };
      },
      
      addThread: (state, action) => {
        const { topic, threadId, title, content } = action.payload;
        
        //push to topic's idTree as response
        state.messages.idTree[topic].push(threadId);

        //create idTree for thread and post data in byId
        state.messages.idTree[threadId] = [];
        state.messages.byId[threadId] = {
            user: 'default',
            title: title,
            content: content
        };
      },

    addMessage: (state, action) => {
      const { replyTo, threadId, content } = action.payload;

      state.messages.idTree[replyTo].push(threadId);
      
      state.messages.idTree[threadId] = [];
      state.messages.byId[threadId] = {
          user: 'default',
          title: '',
          content: content
      };
    }
  },
});

export const { addTopic, addThread, addMessage } = postSlice.actions;
export const selectPosts = (state) => {
    const postsState = state.posts;
    const structuredTree = [];
  
    //recursive function to generate tree of messages
    const buildTree = (currentId) => {
        const childIdList = postsState.messages.idTree[currentId] || [];
        if(childIdList.length === 0 ){
            return {
                ...postsState.messages.byId[currentId],
                replies: []
            };
        }else{
            const currentObject = {
                ...postsState.messages.byId[currentId],
                replies: []
            }
            for(const messageId of childIdList){
                const reply = buildTree(messageId);
                currentObject.replies.push({
                    ...reply,
                    replyTo: currentId, 
                    id: messageId
                });
            }
            return currentObject;
        }
    }
    // Iterate through the topics
    for (const topicId of postsState.topics) {
      const topicItem = {
        ...postsState.messages.byId[topicId], // Add the base topic
        threads: [],
        id: topicId,
        replyTo: null
      };
  
      // Iterate across child elements (threads) of topics
      for (const threadId of postsState.messages.idTree[topicId]) {
        const threadMessage = {
            ...postsState.messages.byId[threadId],
            replies: [],
            id: threadId,
            replyTo: topicId
        };
        const threadStructure = buildTree(threadId);
        threadMessage.replies = threadStructure.replies; // Assign replies from the structure
        topicItem.threads.push(threadMessage);
      }
      structuredTree.push(topicItem);
    }
    return structuredTree;
  };
  
export default postSlice.reducer;
