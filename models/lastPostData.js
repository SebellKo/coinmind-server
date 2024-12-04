const { connectDB } = require('../db/db');

const insertLastPostData = async (lastPostNum) => {
  try {
    const db = (await connectDB).db(process.env.MONGODB_COLLECTION_NAME);
    const collection = await db.collection('lastPostData');

    const result = await collection.findOneAndUpdate(
      {},
      { $set: { lastPostNum: lastPostNum } },
      { upsert: true }
    );

    return result.value;
  } catch (error) {
    console.error('lastPostData 삽입 에러', error);
    throw error;
  }
};

const findLastPostData = async () => {
  try {
    const db = (await connectDB).db(process.env.MONGODB_COLLECTION_NAME);
    const collection = await db.collection('lastPostData');

    const result = await collection.findOne();

    return result.postNum;
  } catch (error) {
    console.log('findLastPost 에러', error);
    throw error;
  }
};

module.exports = { insertLastPostData, findLastPostData };
