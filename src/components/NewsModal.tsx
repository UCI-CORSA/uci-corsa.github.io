import React, { useState, useRef, useEffect } from 'react'
import styled from '@emotion/styled'
import { Color, FontVariant, ScreenSize } from '@/app/theme'
import { Category, CategoryContainer, NewsDate, categoryColors } from './NewsCard'
import { Post } from '@/data/posts'
import Markdown from 'react-markdown'
import { withBasePath } from '@/lib/basePath'

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.28);
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalCard = styled.div`
  width: 70%;
  max-width: ${ScreenSize.max};
  background-color: ${Color.white};
  padding: 48px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;

  @media (max-width: ${ScreenSize.lg}) {
    width: 90%;
    max-height: 90%;
    padding: 24px 16px;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: top;
  margin-bottom: 8px;
`

const Title = styled.div`
  ${FontVariant.title_md}
  padding-top: 4px;
`

const CloseButton = styled.button`
  position: relative;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;

  // draw 'x' icon
  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 24px;
    height: 2px;
    background-color: ${Color.gray600};
  }
  &:before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &:after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
`

const ModalPdfLink = styled.a`
  ${FontVariant.body_md}
  font-weight: 700;
  color: ${Color.blue900};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const Content = styled.div`
  ${FontVariant.body_md}
  color: ${Color.gray900};
  max-height: 60vh;
  overflow-y: auto;
  padding-right: 8px;
  h1 {
    ${FontVariant.title_lg}
    text-align: left;
    margin-top: 24px;
  }
  h2 {
    ${FontVariant.title_md}
    margin-top: 20px;
    &:first-of-type {
      margin-top: 4px;
    }
  }
  h3 {
    ${FontVariant.body_lg}
    margin-top: 16px;
  }
  img {
    max-width: 100%;
  }
  p {
    margin-top: 8px;
  }
  ul,
  ol {
    margin-top: 8px;
    padding-left: 24px;
  }
  li {
    margin-top: 4px;
  }
  strong {
    font-weight: 700;
  }
  a {
    color: ${Color.blue900};
    font-weight: 700;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

interface Props {
  post: Post | null
  onClose: () => void
}

export const NewsModal = ({ post, onClose }: Props) => {
  const [mdContent, setMdContent] = useState<string | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [modalRef, onClose])

  useEffect(() => {
    setMdContent(null)
    post?.contentMdFilePath &&
      fetch(withBasePath(`/posts/${post.contentMdFilePath}`))
        .then(response => (response.ok ? response.text() : ''))
        .then(text => {
          setMdContent(text)
        })
  }, [post])

  if (!post) {
    return null
  } else {
    const currentDate = new window.Date()
    const expired = post.endsAt && post.endsAt < currentDate

    return (
      post && (
        <ModalContainer>
          <ModalCard ref={modalRef}>
            <Header>
              <div>
                <CategoryContainer labelsOnLeft>
                  {post.categories.map((category, i) => (
                    <Category key={i} style={{ backgroundColor: expired ? Color.gray400 : categoryColors[category] }}>
                      {category}
                    </Category>
                  ))}
                  {expired !== undefined &&
                    (expired ? (
                      <Category style={{ backgroundColor: Color.gray400 }}>Closed</Category>
                    ) : (
                      <Category style={{ backgroundColor: Color.green300 }}>Open</Category>
                    ))}
                </CategoryContainer>
                <Title>{post.title}</Title>
              </div>
              <CloseButton onClick={onClose} aria-label="Close" />
            </Header>

            <MetaRow>
              <NewsDate style={{ marginBottom: 0 }}>{post.date.toDateString()}</NewsDate>
              {post.pdfFilePath && (
                <ModalPdfLink
                  href={withBasePath(`/docs/${post.pdfFilePath}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Full Flyer (PDF) ↗
                </ModalPdfLink>
              )}
            </MetaRow>
            <Content>
              <Markdown>{mdContent}</Markdown>
            </Content>
          </ModalCard>
        </ModalContainer>
      )
    )
  }
}
