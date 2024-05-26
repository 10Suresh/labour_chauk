// export const authToken = async (req, res, next) => {
//     try {
//         const token = req.cookies.token || req.headers.token;
//         if (token) {
//             console.log(token);
//             next(); 
//         } else {
//             throw new Error("Authentication token not found");
//         }
//     } catch (error) {
//         res.status(400).json({
//             message: error.message || error,
//             data: [],
//             error: true,
//             success: false
//         });
//     }
// };
