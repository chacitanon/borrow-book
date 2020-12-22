import React from "react";
import styled from "styled-components";
import {
  Collapse,
  Input,
  Divider,
  Tag,
  Row,
  Col,
  Checkbox,
  Form,
  Pagination,
  Typography,
} from "antd";
import axios from "../../config/axios";

import { useHistory } from "react-router-dom";

const { CheckableTag } = Tag;
const { Panel } = Collapse;
const { Search } = Input;

const ProductContentContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background: #fff;
  margin: 0 auto;
  border-radius: 10px;
`;

const FilterOptionContainer = styled.div`
  width: 20%;
  /* background: #f3e3d1; */
  float: left;
  border-right: 5px solid #fff5ea;
`;

const FindProductContainer = styled.div`
  padding: 3rem;
  /* margin-top: 2rem; */
  width: 90%;
  /* background: #f1e3d2; */
`;

const ProductContainer = styled.div`
  width: 95%;
  margin-top: 2rem;
  padding: 1rem;
`;

const SearchAndProductContainer = styled.div`
  width: 80%;
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: 10rem;
  height: 10rem;
  background: cover center;
`;


const ProductRow = styled.div`
  width: 10rem;
  height: 13rem;
  border-bottom: 1px solid #000;
  cursor: pointer;
`;

export default function AllBook() {
  const [form] = Form.useForm();
  const [selectTag, setSelectTag] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [actualPresentedProduct, setActualPresentedProduct] = React.useState(
    products
  );

  const history = useHistory();

  const [searchQuery, setSearchQuery] = React.useState({

    book: [],
    type: [],
    code: [],
    author: [],
    price: [],
  });

  const bookOptions = [
    { label: "pompompom", value: "pompompom" },

  ];

  const [books, setBooks] = React.useState(bookOptions);

  const onSearch = async (value) => {
    setIsLoading(true);
    const { data } = await axios.get(`/books/?_search=${value}`);
    const searchProduct = data;
    setProducts(searchProduct);
    setIsLoading(false);
  };
  const onSearchBook = (e) => {
    const valueAsRegex = new RegExp(e.target.value, "gi");
    const searchBook = bookOptions.filter((book) =>
      valueAsRegex.test(book.label)
    );
    setBooks(searchBook);
  };

  const onSearchTypeName = (e) => {
    const valueAsRegex = new RegExp(e.target.value, "gi");
    const searchType = typeOptions.filter((type) =>
      valueAsRegex.test(type.label)
    );
    setBooks(searchType);
  };

  const onSearchCode = (e) => {
    const valueAsRegex = new RegExp(e.target.value, "gi");
    const searchType = codeOptions.filter((code) =>
      valueAsRegex.test(code.label)
    );
    setBooks(searchType);
  };

  const onSearchAuthor = (e) => {
    const valueAsRegex = new RegExp(e.target.value, "gi");
    const searchType = authorOptions.filter((author) =>
      valueAsRegex.test(author.label)
    );
    setBooks(searchType);
  };

  const tagsData = [

  ];

  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectTag, tag]
      : selectTag.filter((t) => t !== tag);
    setSelectTag(nextSelectedTags);
    setSearchQuery({ ...searchQuery, type: [...nextSelectedTags] });
  };

  const fetchAllProducts = async () => {
    const { data } = await axios.get("/books/");
    setProducts(data);
    setActualPresentedProduct(data);
  };



  const authorOptions = [
    { label: "pompom", value: "pompom" },
    { label: "poppop", value: "poppop" },
    { label: "aaaa", value: "aaaa" },
  ];
  const typeOptions = [
    { label: "anthology", value: "anthology" },
    { label: "children's", value: "children's" },
    { label: "crime", value: "crime" },
    { label: "drama", value: "drama" },
    { label: "fairytale", value: "fairytale" },
    { label: "horror", value: "horror" },
    { label: "romance", value: "romance" },
  ];
  const codeOptions = [
    { label: "a1", value: "a1" },
    { label: "b2", value: "b2" },
    { label: "c3", value: "c3" },
    { label: "d4", value: "d4" },
    { label: "e5", value: "e5" },
    { label: "f6", value: "f6" },
    { label: "g7", value: "g7" },
    { label: "t8", value: "t8" },
  ];

  React.useEffect(() => {
    fetchAllProducts();
  }, []);
  React.useEffect(() => {
    setActualPresentedProduct(products);
  }, [products]);

  const handleNextPage = (id) => {
    history.push(`/book/${id}`);
  };

  React.useEffect(() => {
    const filteredProducts = products.filter(
      (item) =>

        (searchQuery.book.length
          ? searchQuery.book.includes(item.name)
          : true) &&

        (searchQuery.type.length
          ? searchQuery.type.includes(item.type_name)
          : true) &&
        (searchQuery.author.length
          ? searchQuery.author.includes(item.author)
          : true) &&
        (searchQuery.code.length
          ? searchQuery.code.includes(item.type_code)
          : true)
    );
    setActualPresentedProduct(filteredProducts);
  }, [searchQuery]);

  const debounce = (func, wait) => {
    let timeout;

    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const onChangeForm = (values, allvalues) => {
    console.log(values);
    setSearchQuery({ ...searchQuery, ...values });
  };

  return (
    <ProductContentContainer>
      <FilterOptionContainer>
        <Form
          form={form}
          name="control-hooks"
          onValuesChange={debounce(onChangeForm, 500)}
        >
          <Collapse defaultActiveKey={["12"]}>

            <Panel header="BOOK" key="22">
              <Input
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="small"
                onChange={onSearchBook}
              />

            </Panel>

            <Divider />


            <Panel header="TYPE NAME" key="32">
              <Input
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="small"
                onChange={onSearchTypeName}
              />
              <Form.Item name="type">
                <Checkbox.Group options={typeOptions} />
              </Form.Item>
            </Panel>


            <Divider />

            <Panel header="CODE" key="42">
              <Input
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="small"
                onChange={onSearchCode}
              />
              <Form.Item name="code">
                <Checkbox.Group options={codeOptions} />
              </Form.Item>
            </Panel>
            <Divider />
            <Panel header="AUTHOR" key="52">
              <Input
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="small"
                onChange={onSearchAuthor}
              />

            </Panel>

          </Collapse>
        </Form>
      </FilterOptionContainer>
      <SearchAndProductContainer>
        <FindProductContainer>
          <h1>Find Books</h1>
          <Search
            placeholder="input search text"
            allowClear
            // enterButton="Search"
            size="large"
            onSearch={onSearch}
            loading={isLoading}
            style={{ width: 600, margin: '0 10px' }}
          />
          {tagsData.map((tag) => (
            <CheckableTag
              key={tag}
              checked={selectTag.indexOf(tag) > -1}
              onChange={(checked) => handleChange(tag, checked)}
            >
              {tag}
            </CheckableTag>
          ))}
        </FindProductContainer>

        <ProductContainer>
          <Row align="middle" justify="center">
            {actualPresentedProduct &&
              actualPresentedProduct.map(({ name, main_image, id, author }) => (
                <Col span={6} key={id}>
                  <ProductRow onClick={() => handleNextPage(id)}>
                    <Image src={main_image} alt="" />
                    <Row justify="center">
                      <Typography.Text>Book :{name}</Typography.Text>
                    </Row>
                    <Row justify="center">
                      <Typography.Text>Author :{author}</Typography.Text>
                    </Row>

                  </ProductRow>
                </Col>
              ))}
          </Row>
        </ProductContainer>
        <Pagination current={1} total={20} />
      </SearchAndProductContainer>
    </ProductContentContainer>
  );
}
