const threadService = require("../services/threadService");
const etc = require("../middleware/etc");
const secretKey = process.env.SECRET_KEY;

const insertThread = async (req, res) => {
  try {
    const content = req.body.content;

    const acccesToken = req.headers.authorization;
    console.log(acccesToken);
    const decoded = etc.decoded(acccesToken, secretKey);

    const userId = decoded.userId;
    console.log("userId : ", userId);

    const result = await threadService.insertThread(content, userId);
    return res.status(200).json({ message: "thread 등록성공!", result });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const selectThread = async (req, res) => {
  try {
    const result = await threadService.totalSelect();
    if (!result) {
      return res.status(200).json({});
    } else {
      return res.status(200).json({ message: result });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const selectOneThread = async (req, res) => {
  try {

    const userId = req.body.userId;
    const threadId = req.body.threadId;

    if (!userId || !threadId) {
      return res.status(400).json({ message: "userId와 threadId가 일치하지 않습니다." });
    }
    const result = await threadService.oneSelect(threadId,userId);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const threadUpdate = async (req, res) => {
  try {
    const acccesToken = req.headers.authorization;
    const decoded = etc.decoded(acccesToken, secretKey);
    const userId = decoded.userId;

    const content = req.body.content;
    const threadId = req.body.threadId;

    console.log("유저 아이디 : ", userId);
    console.log("내용 : ", content);
    // const threadId = await threadService.threadId(userId);

    if (!content || !threadId || !userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    const result = await threadService.updateThread(content, threadId, userId);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const threadDelete = async (req, res) => {
  try {
    const acccesToken = req.headers.authorization;
    const decoded = etc.decoded(acccesToken, secretKey);
    const userId = decoded.userId;

    const threadId = req.body.threadId;

    if (!threadId || !userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    const result = await threadService.deleteThread(threadId, userId);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const insertLikes = async (req, res) => {
  try {
      const threadId = req.body.threadId;

      const acccesToken = req.headers.authorization;
      const decoded = etc.decoded(acccesToken, secretKey);
      const userId = decoded.userId;
      
    if (!userId || !threadId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    const result = await threadService.insertLikes(userId, threadId);
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  insertThread,
  selectThread,
  selectOneThread,
  threadUpdate,
  threadDelete,
  insertLikes,
};
