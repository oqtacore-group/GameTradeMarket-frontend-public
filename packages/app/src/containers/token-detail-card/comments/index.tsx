import { useCallback, useState, useRef } from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';

import { useAuthContext } from '@game-trade/lib';
import { Button, Modal } from '@game-trade/ui';
import { SvgAvatarPerson } from '@game-trade/icons';
import { useAddCommentMutation, useRemoveCommentMutation } from '@game-trade/lib/src/codegen-types';

import IconRefreshSvg from '@root/public/imgs/icon_refresh.svg';
import IconTrashSvg from '@root/public/imgs/icon_trash.svg';

import {
  WrapperComments,
  Headline,
  WrapperContent,
  CommentWrapper,
  PostCommentWrapper,
  AvatarAndMetadataWrapper,
  Avatar,
  Metadata,
  DeleteComment,
  NameAndDateWrapper,
  Username,
  Date,
  Nickname,
  Text,
  CommentsListWrapper,
  ModalContent,
  ConfirmModalRowButtons,
  ModalButton,
} from './style';

type CardComments = {
  text: string;
};

interface IProps {
  itemId: string;
  comments: any;
  data?: CardComments[];
  getGameTokenCardsLazyQuery: any;
}

export const ItemComments = ({ itemId, comments, getGameTokenCardsLazyQuery }: IProps) => {
  const {
    authProviderData: { userInfoData, isAuthenticated },
  } = useAuthContext();

  const router = useRouter();

  const { tokenCardId: token_id } = router.query;

  const [addComment] = useAddCommentMutation({
    fetchPolicy: 'no-cache',
  });

  const [removeComment] = useRemoveCommentMutation({
    fetchPolicy: 'no-cache',
  });

  const commentsContainerRef = useRef<any>(null);

  const [newComment, setNewComment] = useState<string>('');
  const changeComment = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setNewComment(e.target.value),
    [setNewComment]
  );

  const refreshComments = useCallback(async () => {
    getGameTokenCardsLazyQuery({
      variables: {
        id: token_id as string,
      },
    });
  }, [token_id, getGameTokenCardsLazyQuery]);

  const handleAddComment = useCallback(async () => {
    if (!newComment) return;

    await addComment({
      variables: {
        item_id: itemId,
        message: newComment,
      },
    });

    refreshComments();

    setNewComment('');

    if (commentsContainerRef.current) {
      commentsContainerRef.current.scrollTop = 0;
    }
  }, [newComment]);

  const [commentIdToDelete, setCommentIdToDelete] = useState<string>('');

  const handleRemoveComment = useCallback(async () => {
    await removeComment({
      variables: {
        comment_id: commentIdToDelete,
      },
    });

    refreshComments();

    hideDeleteCommentModal();
  }, [commentIdToDelete]);

  const handleUserKeyPress = async (e: any) => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      handleAddComment();
    }
  };

  const [deleteCommentModalVisible, setDeleteCommentModalVisible] = useState<boolean>(false);
  const showDeleteCommentModal = useCallback((e: any) => {
    setCommentIdToDelete(e.currentTarget.dataset.commentId!);
    setDeleteCommentModalVisible(true);
  }, []);
  const hideDeleteCommentModal = useCallback(() => setDeleteCommentModalVisible(false), []);

  return (
    <WrapperContent>
      <Headline>
        <span>Comments</span>

        <div>
          <IconRefreshSvg />

          <span style={{ marginLeft: '8px' }} onClick={refreshComments}>
            Refresh
          </span>
        </div>
      </Headline>

      <WrapperComments>
        {isAuthenticated && (
          <PostCommentWrapper>
            <div>
              {userInfoData?.image_url ? (
                <Avatar src={userInfoData?.image_url} />
              ) : (
                <SvgAvatarPerson width="30px" height="30px" style={{ marginRight: '20px' }} />
              )}

              <input
                type="text"
                placeholder={`Add a comment as ${userInfoData?.nick_name}`}
                value={newComment}
                onChange={changeComment}
                onKeyDown={handleUserKeyPress}
              />
            </div>

            <Button onClick={handleAddComment}>Send</Button>
          </PostCommentWrapper>
        )}

        {comments?.edges.node.length ? (
          <CommentsListWrapper ref={commentsContainerRef}>
            {comments?.edges.node.map((c: any) => (
              <CommentWrapper key={c.id}>
                <AvatarAndMetadataWrapper>
                  {c.owner.image_url ? (
                    <Avatar src={c.owner.image_url} />
                  ) : (
                    <SvgAvatarPerson width="30px" height="30px" style={{ marginRight: '20px' }} />
                  )}

                  <Metadata>
                    <NameAndDateWrapper>
                      <Username>{c.owner.nick_name}</Username>

                      <Date>
                        {moment(c.create_time)
                          .format('MMM D, H:m a.')
                          .replace('am.', 'a.m.')
                          .replace('pm.', 'p.m.')}
                      </Date>
                    </NameAndDateWrapper>

                    {c.owner.custom_url && <Nickname>@{c.owner.custom_url}</Nickname>}
                  </Metadata>

                  {c.owner.nick_name === userInfoData?.nick_name && (
                    <DeleteComment onClick={showDeleteCommentModal} data-comment-id={c.id}>
                      <IconTrashSvg />
                    </DeleteComment>
                  )}
                </AvatarAndMetadataWrapper>

                <Text>{c.message}</Text>
              </CommentWrapper>
            ))}
          </CommentsListWrapper>
        ) : (
          <p>No comments yet</p>
        )}
      </WrapperComments>

      {deleteCommentModalVisible && (
        <Modal onClose={hideDeleteCommentModal} hasHeader={false} isPadding={false} size={455}>
          <ModalContent>
            <p>Do you want to delete your comment?</p>

            <ConfirmModalRowButtons>
              <ModalButton onClick={handleRemoveComment} dimension="m" appearance="secondary">
                Yes
              </ModalButton>

              <ModalButton onClick={hideDeleteCommentModal} dimension="m" appearance="primary">
                No
              </ModalButton>
            </ConfirmModalRowButtons>
          </ModalContent>
        </Modal>
      )}
    </WrapperContent>
  );
};
