const threadCommentService = require("../services/threadCommentService");
const etc = require("../middleware/etc");
const secretKey = process.env.SECRET_KEY;

const insertComment = async (req, res) => {
  try {
    const content = req.body.content;
    const threadId = req.body.threadId;

    const acccesToken = req.headers.authorization;
    const decoded = etc.decoded(acccesToken, secretKey);

    const userId = decoded.userId;

    const result = await threadCommentService.insertComment(
      userId,
      content,
      threadId
    );
    return res.status(200).json({ message: "댓글 등록 성공" ,result});
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const selectComment = async (req, res) => {
  try {
    const threadId = req.body.threadId;
    const result = await threadCommentService.selectComment(threadId);
    if (!result) {
      return res.status(200).json({});
    } else {
      return res.status(200).json({ message: result });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const content = req.body.content;
    const threadCommentId = req.body.threadCommentId;
    const acccesToken = req.headers.authorization;
    const decoded = etc.decoded(acccesToken, secretKey);
    const userId = decoded.userId;

    console.log("userId: " + userId);

    const result = await threadCommentService.updateComment(
      content,
      threadCommentId,
      userId
    );
    return res.status(200).json({ message: "댓글 수정 완료" , result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const threadCommentId = req.body.threadCommentId;
    const acccesToken = req.headers.authorization;
    const decoded = etc.decoded(acccesToken, secretKey);
    const userId = decoded.userId;

    const result = await threadCommentService.deleteComment(
      threadCommentId,
      userId
    );

    return res.status(200).json({ message: "댓글 삭제 완료" , result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  insertComment,
  selectComment,
  updateComment,
  deleteComment,
};
