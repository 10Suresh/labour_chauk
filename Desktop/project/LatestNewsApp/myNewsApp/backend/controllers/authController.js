import User from '../models/user.js';
import bcrypt from 'bcrypt'
export const registerUser = async (req, res) => {
	try {
	  const { username, email, password } = req.body;
	  const existingUser = await User.findOne({ email });
	  if (existingUser) {
		return res.status(400).json({ error: 'Email is already registered' });
	  }
	  const hashedPassword = await bcrypt.hash(password, 10); 
	  const newUser = new User({ username, email, password: hashedPassword });
	  await newUser.save();
	  res.status(200).json({ message: 'User registered successfully' });
	} catch (error) {
	  console.error('Error registering user:', error);
	  res.status(500).json({ error: 'An error occurred while registering user' });
	}
  };

export const getUser = async (req, res) => {
	try {
		const UserData = await User.find();
		res.status(200).json({ message: 'User fetch successfully', UserData });
	} catch (error) {
		console.error('Error fetch user:', error);
		res.status(500).json({ error: 'An error occurred while fetch user' });
	}
};

export const getOne = async (req, res) => {
	try {
		const id = req.params.id;
		const UserExist = await User.findById(id);
		if (!UserExist) {
			return res.status(400).json({ error: 'user not found' });
		}
		res.status(200).json({ message: 'User fetch successfully', UserExist });
	} catch (error) {
		console.error('Error fetch user:', error);
		res.status(500).json({ error: 'An error occurred while fetch user' });
	}
};
export const update = async (req, res) => {
	try {
		const id = req.params.id;
		const UserExist = await User.findById(id);
		if (!UserExist) {
			return res.status(400).json({ error: 'user not found' });
		}
		const updatedData = await User.findByIdAndUpdate(id, req.body,{new:true});
        res.status(200).json({message:'Update Data successfully',updatedData})
	} catch (error) {
		res.status(500).json({ error: 'An error occurred while fetch user' });
	}
};
export const deleteUser = async (req, res) => {
	try {
		const id = req.params.id;
		const UserExist = await User.findById(id);
		if (!UserExist) {
			return res.status(400).json({ error: 'user not found' });
		}
		const deleteData = await User.findByIdAndDelete(id);
        res.status(200).json({message:'Deleted Data successfully'})
	} catch (error) {
		res.status(500).json({ error: 'An error occurred while fetch user' });
	}
};



// export const userDetails = async (res,req)=>{
// 	try{

// 	}catch(error){
// 		res.status(400).json({
// 			message:error.message || error,
// 			error:true,
// 			success: false
// 		})
// 	}
// }