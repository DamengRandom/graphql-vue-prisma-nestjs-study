<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { useAddAuthor, useAddBook, useAuthors, useBooks } from './service/index';
  import { ElMessage } from 'element-plus';

  const { result: booksResult, refetch: refetchBooks } = useBooks();
  const { result: authorsResult, refetch: refetchAuthors } = useAuthors();

  const authorDialogVisible = ref(false);
  const authorFormData = reactive({
    name: '',
    gender: '',
    email: ''
  });

  const showAddAuthorDialog = () => {
    authorDialogVisible.value = true;
  }

  const bookDialogVisible = ref(false);
  const bookFormData = reactive({
    name: '',
    type: '',
    authorId: '',
  });

  const showAddBookDialog = () => {
    bookFormData.name = '';
    bookFormData.type = '';
    bookFormData.authorId = '';
    bookDialogVisible.value = true;
  }

  const onSubmitAuthor = async () => {
    const { mutate, onDone } = useAddAuthor();
    
    // Set up the onDone callback before calling mutate
    onDone(() => {
      refetchAuthors(); // refetch the data after data has been updated
      ElMessage.success(`Author ${authorFormData.name} has been created successfully ~`);
      authorDialogVisible.value = false;
      authorFormData.name = '';
      authorFormData.gender = '';
      authorFormData.email = '';
    });

    await mutate({
      createAuthorInput: {
        name: authorFormData.name,
        gender: authorFormData.gender,
        email: authorFormData.email,
      }
    });
  }

  const onSubmitBook = async () => {
    const { mutate, onDone } = useAddBook();
    
    // Set up the onDone callback before calling mutate
    onDone(() => {
      refetchBooks(); // refetch the data after data has been updated
      ElMessage.success(`Book ${bookFormData.name} has been created successfully ~`);
      bookDialogVisible.value = false;
      bookFormData.name = '';
      bookFormData.type = '';
      bookFormData.authorId = '';
    });

    await mutate({
      createBookInput: {
        name: bookFormData.name,
        type: bookFormData.type,
        authorId: bookFormData.authorId
      }
    });
  }
</script>

<template>
  <div><el-button @click="showAddAuthorDialog">Add Author</el-button></div>
  <div><el-button @click="showAddBookDialog">Add Book</el-button></div>

  <div>
    <el-table :data="booksResult?.books">
      <el-table-column label="Book Name" prop="name"></el-table-column>
      <el-table-column label="Book Type" prop="type"></el-table-column>
      <el-table-column label="Book Author" prop="author.name"></el-table-column>
    </el-table>
  </div>

  <el-dialog v-model="authorDialogVisible">
    <el-form :model="authorFormData">
      <el-form-item label="Name" prop="name">
        <el-input v-model="authorFormData.name"></el-input>
      </el-form-item>
      <el-form-item label="Gender" prop="gender">
        <el-radio-group v-model="authorFormData.gender">
          <el-radio :label="1">Male</el-radio>
          <el-radio :label="2">Female</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="authorFormData.email"></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button type="primary" @click="onSubmitAuthor">Submit</el-button>
    </template>
  </el-dialog>

  <el-dialog v-model="bookDialogVisible">
    <el-form :model="bookFormData">
      <el-form-item label="Name" prop="name">
        <el-input v-model="bookFormData.name"></el-input>
      </el-form-item>
      <el-form-item label="Type" prop="type">
        <el-input v-model="bookFormData.type"></el-input>
      </el-form-item>
      <el-form-item label="Author" prop="authorId">
        <el-select v-model="bookFormData.authorId" placeholder="Select Author">
          <el-option v-for="author in authorsResult.authors" :key="author.id" :label="author.name" :value="author.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button type="primary" @click="onSubmitBook">Submit</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
  
</style>
