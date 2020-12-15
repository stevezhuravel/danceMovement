module.exports = (sequelize, Sequelize) => {
    const Video = sequelize.define("videos", {
        videoname: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },  
    });

    return Video;
};