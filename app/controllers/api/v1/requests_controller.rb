class Api::V1::RequestsController < ApplicationController
  before_action :set_request, only: %i[ show update destroy end_execute start_execute ]

  # GET /requests
  def index
    @tags = Tag.where(id: params[:tags])
    @requests = Requests::Filter.call(Request.all, params)

    request_data_with_tags = []

    @requests.each do |request|
      request_attributes = request.attributes.symbolize_keys

      tag_names = request.tags.pluck(:name)
      request_attributes[:tags] = tag_names
      request_attributes[:photo] = request.photo.url

      request_data_with_tags << request_attributes
    end

    render json: { requests: request_data_with_tags, tags: @tags, all_tags: Tag.all.pluck(:name)}
  end

  # GET /requests/1
  def show
    tags = @request.tags
    user = @request.user
    executor = @request.executor
    executor_profile  = nil
    executor_profile = executor.profile if executor

    user_profile = @request.user.profile
    latest_posts = Request.order(created_at: :desc).limit(3)

    render json: { request: @request, tags:, user:, user_profile:, executor:, executor_profile:, latest_posts: }
  end

  # POST /requests
  def create
    tags = params[:request][:tag_ids].values.map { |tag_id| Tag.find(tag_id) }
    @request = current_user.requests.build(request_params)
    @request.tags << tags
    if @request.save
      render json: @request, status: :created, location: api_v1_requests_path
    else
      render json: @request.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /requests/1
  def update
    if @request.update(request_params)
      render json: @request
    else
      render json: @request.errors, status: :unprocessable_entity
    end
  end

  # DELETE /requests/1
  def destroy
    @request.destroy!
  end

  def start_execute 
    if current_user 
      @request.executor = current_user
      if @request.save
        render json: {request: @request, executor: @request.executor, profile: @request.executor.profile}
      else
        render json:  @request.errors, status: :unprocessable_entity
      end
    else 
      render json: "Nor Auth", status: :unprocessable_entity
    end
  end

  def end_execute 
    @request.completed = true
    if @request.save
      render json:{ request: @request}
    else
      render json: @request.errors, status: :unprocessable_entity
    end
  end

  private

  def set_request
    @request = Request.find(params[:id])
  end

  def request_params
    params.require(:request).permit(:title, :body, :photo, :executor, :completed, tag_ids: [])
  end
end
