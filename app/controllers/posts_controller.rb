class PostsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_post, only: [:show, :edit, :update, :destroy, :like]
  before_action :owned_post, only: [:edit, :update, :destroy]

  def index
    @posts = Post.all.order('created_at DESC').page params[:page]
    raise
  end

  def show
  end

  def new
    @post = current_user.posts.build
  end

  def create
    @post = current_user.posts.build(post_params)

    if @post.save
      flash[:success] = "写真を掲載しました!"
      redirect_to root_path
    else
      flash[:alert] = "写真の掲載ができません!  フォームを見直してください"
      render :new
    end
  end

  def edit
  end

  def update
    if @post.update(post_params)
      flash[:success] = "更新しました！"
      redirect_to root_path
    else
      flash[:alert] = "更新できません!  フォームを見直してください"
      render :edit
    end
  end

  def destroy
    @post.destroy
    flash[:success] = "写真が削除されました！"
    redirect_to root_path
  end

  def like
    if @post.liked_by current_user
      respond_to do |format|
        format.html { redirect_to :back }
        format.js
      end
    end
  end

  private

  def post_params
    params.require(:post).permit(:image, :caption)
  end

  def set_post
    @post = Post.find(params[:id])
  end

  def owned_post
    unless current_user == @post.user
      flash[:alert] = "あなたの写真ではありません!"
      redirect_to root_path
    end
  end

end
