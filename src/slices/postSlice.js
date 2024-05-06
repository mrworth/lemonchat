import { createSlice, createSelector, createAsyncThunk} from '@reduxjs/toolkit';
import { fetchTopicPosts } from './actions/fetchTopicPosts';
import { addReply } from './actions/addReply';
import { addThread } from './actions/addThread';
import { addTopic } from './actions/addTopic';
import { v4 as uuidv4 } from 'uuid'; 

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    topics: [],
    messages:{
        //contains ids of posts and their replies for structure
        idTree:{
        },
        byId:{
        }
    }
  },
  reducers: {
    // addTopic: (state, action) => {
    //   const { title, content } = action.payload;
    //   const threadId = uuidv4();

    //   state.topics.push(threadId)
    //   state.messages.idTree[threadId] = [];
      
    //   state.messages.byId[threadId] = {
    //       username: 'default',
    //       title: title,
    //       content: content
    //   };
    // },
    
    // addThread: (state, action) => {
    //   const { topic, threadId, title, content } = action.payload;
      
    //   //push to topic's idTree as response
    //   state.messages.idTree[topic].push(threadId);

    //   //create idTree for thread and post data in byId
    //   state.messages.idTree[threadId] = [];
    //   state.messages.byId[threadId] = {
    //       user: 'default',
    //       title: title,
    //       content: content
    //   };
    // },

    // addMessage: (state, action) => {
    //   const { inReplyTo, threadId, content } = action.payload;

    //   state.messages.idTree[inReplyTo].push(threadId);
      
    //   state.messages.idTree[threadId] = [];
    //   state.messages.byId[threadId] = {
    //       username: 'default',
    //       title: '',
    //       content: content
    //   };
    // }
  },
  extraReducers: (builder) => {
    //Thunk action registration for fetching topics
    builder
      .addCase(fetchTopicPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopicPosts.fulfilled, (state, action) => {
        state.loading = false;
        const posts = action.payload;
        for(const index in posts){
          const post = posts[index];
          const postId = post.postId;
          if(state.messages.byId[postId]){
            continue;
          }
          const inReplyTo = post.inReplyTo;
          //post is a topic, add to topics
          if(inReplyTo == null){
            state.topics.push(postId);
          }else{
            state.messages.idTree[inReplyTo].push(postId);
          }
          //add to idTree with postId and add to byId
          state.messages.idTree[postId] = [];
          state.messages.byId[postId] = post;
        }
      })
      .addCase(fetchTopicPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    //Thunk action registration for adding non-thread reply
    builder
      .addCase(addReply.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReply.fulfilled, (state, action) => {
        state.loading = false;
        const post = action.payload;
        const postId = post.postId;
        const inReplyTo = post.inReplyTo;
        //post is a topic, add to topics
        if(inReplyTo == null){
          state.topics.push(postId);
        }else{
          state.messages.idTree[inReplyTo].push(postId);
        }
        //add to idTree with postId and add to byId
        state.messages.idTree[postId] = [];
        state.messages.byId[postId] = post;
      })
      .addCase(addReply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //Thunk action registration for adding thread reply
    builder
      .addCase(addThread.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addThread.fulfilled, (state, action) => {
        state.loading = false;
        const post = action.payload;
        const postId = post.postId;
        const inReplyTo = post.inReplyTo;
        //post is a topic, add to topics
        if(inReplyTo == null){
          state.topics.push(postId);
        }else{
          state.messages.idTree[inReplyTo].push(postId);
        }
        //add to idTree with postId and add to byId
        state.messages.idTree[postId] = [];
        state.messages.byId[postId] = post;
      })
      .addCase(addThread.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //Thunk action registration for adding new topic
    builder
      .addCase(addTopic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTopic.fulfilled, (state, action) => {
        state.loading = false;
        const post = action.payload;
        const postId = post.postId;
        const inReplyTo = null;
        //post is a topic, add to topics
        if(inReplyTo == null){
          state.topics.push(postId);
        }else{
          state.messages.idTree[inReplyTo].push(postId);
        }
        //add to idTree with postId and add to byId
        state.messages.idTree[postId] = [];
        state.messages.byId[postId] = post;
      })
      .addCase(addTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {  addMessage } = postSlice.actions;

const getTopics = (state) => state.posts.topics;
const getMessages = (state) => state.posts.messages;

export const selectPosts = createSelector(
  [getTopics, getMessages],
  (topics, messages) => {
    const structuredTree = [];
  
    //recursive function to generate tree of messages
    const buildTree = (currentId) => {
        const childIdList = messages.idTree[currentId] || [];
        if(childIdList.length === 0 ){
            return {
                ...messages.byId[currentId],
                replies: []
            };
        }else{
            const currentObject = {
                ...messages.byId[currentId],
                replies: []
            }
            for(const messageId of childIdList){
                const reply = buildTree(messageId);
                currentObject.replies.push({
                    ...reply,
                    inReplyTo: currentId, 
                    id: messageId
                });
            }
            return currentObject;
        }
    }
    // Iterate through the topics
    for (const topicId of topics) {
      const topicItem = {
        ...messages.byId[topicId], // Add the base topic
        threads: [],
        id: topicId,
        inReplyTo: null
      };
  
      // Iterate across child elements (threads) of topics
      for (const threadId of messages.idTree[topicId]) {
        const threadMessage = {
            ...messages.byId[threadId],
            replies: [],
            id: threadId,
            inReplyTo: topicId
        };
        const threadStructure = buildTree(threadId);
        threadMessage.replies = threadStructure.replies; // Assign replies from the structure
        topicItem.threads.push(threadMessage);
      }
      structuredTree.push(topicItem);
    }
    return structuredTree;
  });
  
  
export default postSlice.reducer;
