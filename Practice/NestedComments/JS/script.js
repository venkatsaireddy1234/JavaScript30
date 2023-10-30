/**
 *  Requirements:
 *    add the comment from input field after clicking on add Comment btn.
 *      then create a dynamic list of comments with a border and that will contain a text abd reply btn.
 *      clicking on reply btn, a comment input filed and a btn has to appear.
 */

class CommentBox {
  constructor() {
      this.commentInput = document.getElementById('commentInput');
      this.addCommentBtn = document.getElementById('addCommentBtn');
      this.commentList = document.getElementById('commentList');

      this.bindEvents();
  }

  bindEvents() {
      this.addCommentBtn.addEventListener('click', () => {this.addComment()});
  }

  addComment() {
      const inputText = this.commentInput.value.trim();

      if(inputText.length) {
          const newComment = this.createComment(inputText);
          this.commentList.appendChild(newComment);
          this.commentInput.value = '';
      }
  }

  createComment(text) {
      const li = document.createElement('li');

      // creating the text with p element.
      const pElem = this.createTextElement(text);
      li.appendChild(pElem);

      // creating the reply button element.
      const replyBtn = this.createReplyBtn();
      li.appendChild(replyBtn);

      let replyAdded = false;
      replyBtn.addEventListener('click', ()=> { 
          if(!replyAdded) {
              this.showReplyInput(li);
              replyAdded = true;
          }
      });
      
      // createing a reply container.
      const replyContainer = this.createReplyContainer();
      li.appendChild(replyContainer)

      return li;
  }

  createTextElement(text) {
      const commmentPElem = document.createElement('p');
      commmentPElem.textContent = text;

      return commmentPElem;
  }

  createReplyBtn() {
      const replyBtn = document.createElement('button');
      replyBtn.className = 'replyBtn';
      replyBtn.textContent = 'Reply';

      return replyBtn;
  }

  createReplyContainer() {
      const replyContainer = document.createElement('div');
      replyContainer.className = 'reply-container';

      return replyContainer;
  }

  showReplyInput(parentLi) {
      // const replyBtn = event.target;
      // console.log(replyBtn);
      // const li  = replyBtn.parentElement;
      const replyContainer = parentLi.querySelector('.reply-container');

      const replyInput = this.createReplyInput()

      const addReplyBtn = this.createAddReplyBtn();
      addReplyBtn.addEventListener('click', this.addReply.bind(this, replyContainer, replyInput));

      replyContainer.appendChild(replyInput);
      replyContainer.appendChild(addReplyBtn);
  }

  createReplyInput() {
      const replyInput = document.createElement('input');
      replyInput.type = 'text';
      replyInput.placeholder = 'Enter your reply...';

      return replyInput;
  }

  createAddReplyBtn() {
      const addReplyBtn = document.createElement('button');
      addReplyBtn.textContent = 'Add Reply';

      return addReplyBtn;
  }

  addReply(replyContainer, replyInput) {
     const replyText = replyInput.value.trim();

     if(replyText.length) {
       const replyLi = this.createComment(replyText);
       replyContainer.appendChild(replyLi);
       replyInput.value = '';
     }
  }
}

new CommentBox();