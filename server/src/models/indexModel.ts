import User from "./User";
async function createModel() {
    await User.sync()
    console.log(`create Modal thanh cong`)
}
export default createModel