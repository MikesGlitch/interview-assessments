import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { NextRouter} from 'next/dist/client/router'
import { getCatsAsync } from '../gallery/catsGallerySlice'
import { uploadCat as uploadCatApi } from './catsUploadAPI'

export interface CatsState {
  status: 'idle' | 'loading' | 'failed' | 'complete',
}

const initialState: CatsState = {
  status: 'idle',
}

interface IUploadCatAction {
  fileToUpload: File, 
  router: NextRouter
}

// thunks
export const uploadCatAsync = createAsyncThunk(
  'cats/upload',
  async (action: IUploadCatAction, { dispatch }) => {
    const response = await uploadCatApi(action.fileToUpload)
    if(response.successful) {
      dispatch(getCatsAsync({ page: 0 }))
      action.router.push('/')
    } else {
      alert(response.errorMsg)
    }
  }
)

export const catsSlice = createSlice({
  name: 'cats',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(uploadCatAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(uploadCatAsync.fulfilled, (state, action) => {
        state.status = 'idle'
      })
  },
})

export const { } = catsSlice.actions

export default catsSlice.reducer
