const threadService = require("../services/threadService");
const etc = require("../middleware/etc");

const insertThread = async (req, res) => {
  try {
    const content = req.body.content;

    const acccesToken = req.headers.authorization;
    console.log(acccesToken);
    const secretKey = process.env.SECRET_KEY;
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
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "userId가 일치하지 않습니다." });
    }
    const result = await threadService.oneSelect(userId);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postUpdate = async (req, res) => {
  try {
    const { content, threadId, userId } = req.body;

    if (!content || !threadId || !userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    const result = await threadService.updateThread(content, threadId, userId);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postDelete = async (req, res) => {
  try {
    const { threadId, userId } = req.body;
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
    const { userId, threadId } = req.body;
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
  postUpdate,
  postDelete,
  insertLikes,
};
